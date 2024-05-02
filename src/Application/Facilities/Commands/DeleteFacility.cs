using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Facilities.Commands;

public record DeleteFacilityCommand(int Id) : IRequest<int>;

public class DeleteFacilityCommandValidator : AbstractValidator<DeleteFacilityCommand>
{
    public DeleteFacilityCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Facilities.FindAsync([id], cancellationToken) != null)
            .WithMessage("Facility does not exist.");
    }
}

public class DeleteFacilityCommandHandler(IApplicationDbContext context) : IRequestHandler<DeleteFacilityCommand, int>
{
    public async Task<int> Handle(DeleteFacilityCommand request, CancellationToken cancellationToken)
    {
        var facility = await context.Facilities.FindAsync([request.Id], cancellationToken);

        if (facility == null)
        {
            throw new NotFoundException(nameof(Facility), request.Id.ToString());
        }

        context.Facilities.Remove(facility);

        await context.SaveChangesAsync(cancellationToken);

        return facility.Id;
    }
}
