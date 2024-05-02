using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssetTypes.Commands;

public record DeleteResourceAssetTypeCommand(int Id) : IRequest<int>;

public class DeleteResourceAssetTypeCommandValidator : AbstractValidator<DeleteResourceAssetTypeCommand>
{
    public DeleteResourceAssetTypeCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssetTypes.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class DeleteResourceAssetTypeCommandHandler(IApplicationDbContext context)
    : IRequestHandler<DeleteResourceAssetTypeCommand, int>
{
    public async Task<int> Handle(DeleteResourceAssetTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.ResourceAssetTypes.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ResourceAssetType), request.Id.ToString());
        }
        
        context.ResourceAssetTypes.Remove(entity);

        return await context.SaveChangesAsync(cancellationToken);
    }
}
