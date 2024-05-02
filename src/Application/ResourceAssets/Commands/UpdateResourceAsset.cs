#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssets.Commands;

public record UpdateResourceAssetCommand(
    int Id,
    string? Name,
    string? Description,
    List<int>? TagIds
) : IRequest<int>;

public class UpdateResourceAssetCommandValidator : AbstractValidator<UpdateResourceAssetCommand>
{
    public UpdateResourceAssetCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssets.FindAsync(id) != null)
            .WithMessage("Id is invalid.");

        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.TagIds)
            .MustAsync(async (ids, cancellationToken) =>
            {
                if (ids == null || ids.Count == 0)
                {
                    return true;
                }

                return await context.ResourceAssetTypes.AllAsync(x => ids.Contains(x.Id));
            })
            .WithMessage("One or more tag ids are invalid.");
    }
}

public class UpdateResourceAssetCommandHandler(IApplicationDbContext context)
    : IRequestHandler<UpdateResourceAssetCommand, int>
{
    public async Task<int> Handle(UpdateResourceAssetCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.ResourceAssets.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ResourceAsset), request.Id.ToString());
        }

        entity.Name = request.Name ?? entity.Name;
        
        entity.Description = request.Description ?? entity.Description;
        
        if (request.TagIds != null)
        {
            entity.Tags = request.TagIds.Select(x => new ResourceAssetType { Id = x }).ToList();
        }

        return await context.SaveChangesAsync(cancellationToken);
    }
}
