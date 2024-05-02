using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Areas.Commands;

public record DeleteAreaCommand(int Id) : IRequest<int>;

public class DeleteAreaCommandValidator : AbstractValidator<DeleteAreaCommand>
{
    public DeleteAreaCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Areas.FindAsync([id], cancellationToken) != null)
            .WithMessage("Area does not exist.");
    }
}

public class DeleteAreaCommandHandler(IApplicationDbContext context) : IRequestHandler<DeleteAreaCommand, int>
{
    public async Task<int> Handle(DeleteAreaCommand request, CancellationToken cancellationToken)
    {
        var area = await context.Areas.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (area == null)
        {
            throw new NotFoundException(nameof(Area), request.Id.ToString());
        }

        context.Areas.Remove(area);

        await context.SaveChangesAsync(cancellationToken);

        return area.Id;
    }
}
