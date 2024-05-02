using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssets.Commands;

public record CreateResourceAssetCommand(
    string Name,
    string Description,
    int AreaId,
    List<int> TagIds,
    List<string[]> Attachments
) : IRequest<int>;

public class CreateResourceAssetCommandValidator : AbstractValidator<CreateResourceAssetCommand>
{
    public CreateResourceAssetCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Name is required.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");


        RuleFor(v => v.AreaId)
            .NotEmpty()
            .WithMessage("AreaId is required.")
            .MustAsync(async (id, cancellationToken) => await context.Areas.FindAsync(id) != null)
            .WithMessage("AreaId is invalid.");

        RuleFor(v => v.TagIds)
            .NotEmpty()
            .WithMessage("At least one tag is required.")
            .MustAsync(async (ids, cancellationToken) =>
            {
                return await context.ResourceAssetTypes.AllAsync(x => ids.Contains(x.Id));
            })
            .WithMessage("One or more tag ids are invalid.");
    }
}

public class CreateResourceAssetCommandHandler(IApplicationDbContext context)
    : IRequestHandler<CreateResourceAssetCommand, int>
{
    public async Task<int> Handle(CreateResourceAssetCommand request, CancellationToken cancellationToken)
    {
        var entity = new ResourceAsset
        {
            Name = request.Name,
            Description = request.Description,
            AreaId = request.AreaId,
            Tags = request.TagIds.Select(x => new ResourceAssetType { Id = x }).ToList(),
        };

        context.ResourceAssets.Add(entity);

        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
