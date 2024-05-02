using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssetTypes.Commands;

public record CreateResourceAssetTypeCommand(string Name, string Description, string? Icon) : IRequest<int>;

public class CreateResourceAssetTypeCommandValidator : AbstractValidator<CreateResourceAssetTypeCommand>
{
    public CreateResourceAssetTypeCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Name is required.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");
    }
}

public class CreateResourceAssetTypeCommandHandler(IApplicationDbContext context)
    : IRequestHandler<CreateResourceAssetTypeCommand, int>
{
    public async Task<int> Handle(CreateResourceAssetTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = new ResourceAssetType
        {
            Name = request.Name,
            Description = request.Description,
            Icon = request.Icon
        };

        context.ResourceAssetTypes.Add(entity);

        return await context.SaveChangesAsync(cancellationToken);
    }
}
