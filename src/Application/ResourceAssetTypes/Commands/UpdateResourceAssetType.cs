using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssetTypes.Commands;

public record UpdateResourceAssetTypeCommand(int Id, string? Name, string? Description, string? Icon) : IRequest<int>;

public class UpdateResourceAssetTypeCommandValidator : AbstractValidator<UpdateResourceAssetTypeCommand>
{
    public UpdateResourceAssetTypeCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssetTypes.FindAsync(id) != null)
            .WithMessage("Id is invalid.");

        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");
    }
}

public class UpdateResourceAssetTypeCommandHandler(IApplicationDbContext context)
    : IRequestHandler<UpdateResourceAssetTypeCommand, int>
{
    public async Task<int> Handle(UpdateResourceAssetTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.ResourceAssetTypes.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ResourceAssetType), request.Id.ToString());
        }

        entity.Name = request.Name ?? entity.Name;
        entity.Description = request.Description ?? entity.Description;
        entity.Icon = request.Icon ?? entity.Icon;

        return await context.SaveChangesAsync(cancellationToken);
    }
}
