using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Domain.Enums;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Application.RepairRequests.Commands;

public record RejectRepairRequestCommand(int Id) : IRequest<int>;

public class RejectRepairRequestCommandValidator : AbstractValidator<RejectRepairRequestCommand>
{
    public RejectRepairRequestCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.RepairRequests.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class RejectRepairRequestCommandHandler(IApplicationDbContext context)
    : IRequestHandler<RejectRepairRequestCommand, int>
{
    public async Task<int> Handle(RejectRepairRequestCommand request, CancellationToken cancellationToken)
    {
        var repairRequest = await context.RepairRequests.FindAsync(request.Id);

        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(RepairRequest), request.Id.ToString());
        }

        repairRequest.Status = RepairRequestStatus.Canceled;

        await context.SaveChangesAsync(cancellationToken);

        return repairRequest.Id;
    }
}
