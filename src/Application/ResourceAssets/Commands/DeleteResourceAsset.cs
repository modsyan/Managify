using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Application.ResourceAssets.Commands;

public record DeleteResourceAssetCommand(int Id) : IRequest<int>;

public class DeleteResourceAssetCommandValidator : AbstractValidator<DeleteResourceAssetCommand>
{
    public DeleteResourceAssetCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssets.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class DeleteResourceAssetCommandHandler(IApplicationDbContext context)
    : IRequestHandler<DeleteResourceAssetCommand, int>
{
    public async Task<int> Handle(DeleteResourceAssetCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.ResourceAssets.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ResourceAsset), request.Id.ToString());
        }
        
        context.ResourceAssets.Remove(entity);

        return await context.SaveChangesAsync(cancellationToken);
    }
}
