using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Levels.Commands;

public record DeleteLevelCommand(int Id) : IRequest<int>;

public class DeleteLevelCommandValidator : AbstractValidator<DeleteLevelCommand>
{
    public DeleteLevelCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Levels.FindAsync([id], cancellationToken) != null)
            .WithMessage("Level does not exist.");
    }
}

public class DeleteLevelCommandHandler(IApplicationDbContext context) : IRequestHandler<DeleteLevelCommand, int>
{
    public async Task<int> Handle(DeleteLevelCommand request, CancellationToken cancellationToken)
    {
        var level = await context.Levels.FindAsync([request.Id], cancellationToken);

        if (level == null)
        {
            throw new NotFoundException(nameof(Level), request.Id.ToString());
        }

        context.Levels.Remove(level);

        await context.SaveChangesAsync(cancellationToken);

        return level.Id;
    }
}
