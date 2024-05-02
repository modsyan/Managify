using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;


namespace MMC.Application.RepairRequests.Commands;

public record DeleteRepairRequestCommand(int Id) : IRequest<int>;

public class DeleteRepairRequestCommandValidator : AbstractValidator<DeleteRepairRequestCommand>
{
    public DeleteRepairRequestCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.RepairRequests.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class DeleteRepairRequestCommandHandler(IApplicationDbContext context)
    : IRequestHandler<DeleteRepairRequestCommand, int>
{
    public async Task<int> Handle(DeleteRepairRequestCommand request, CancellationToken cancellationToken)
    {
        var repairRequest = await context.RepairRequests.FindAsync(request.Id);

        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(RepairRequest), request.Id.ToString());
        }

        context.RepairRequests.Remove(repairRequest);

        await context.SaveChangesAsync(cancellationToken);

        return repairRequest.Id;
    }
}
