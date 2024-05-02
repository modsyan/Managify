using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Domain.Enums;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Application.RepairRequests.Commands;

public record ApproveRepairRequestCommand(int Id) : IRequest<int>;

public class ApproveRepairRequestCommandValidator : AbstractValidator<ApproveRepairRequestCommand>
{
    public ApproveRepairRequestCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.RepairRequests.FindAsync(new object?[] { id }, cancellationToken: cancellationToken) != null)
            .WithMessage("Id is invalid.");
    }
}

public class ApproveRepairRequestCommandHandler(IApplicationDbContext context)
    : IRequestHandler<ApproveRepairRequestCommand, int>
{
    public async Task<int> Handle(ApproveRepairRequestCommand request, CancellationToken cancellationToken)
    {
        var repairRequest = await context.RepairRequests.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(RepairRequest), request.Id.ToString());
        }

        repairRequest.Status = RepairRequestStatus.Pending;

        await context.SaveChangesAsync(cancellationToken);

        return repairRequest.Id;
    }
}
