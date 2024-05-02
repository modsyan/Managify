#pragma warning disable CS1998

using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Domain.Enums;

namespace MMC.Application.RepairRequests.Commands;

public record UpdateRepairRequestCommand(
    int Id,
    string? Title,
    string? FaultDescription,
    string? ContractorId,
    string? ContractorNote,
    string? ManagerId,
    string? MangerNote,
    string? SupervisorId,
    string? SupervisorNote,
    string? TechnicianId,
    string? TechnicianNote,
    RepairRequestStatus? Status,
    RepairRequestStatus? Priority
) : IRequest<int>;

public class UpdateRepairRequestCommandValidator : AbstractValidator<UpdateRepairRequestCommand>
{
    public UpdateRepairRequestCommandValidator(IApplicationDbContext context, IIdentityService identityService)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) =>
                await context.RepairRequests.FindAsync(new object?[] { id }, cancellationToken: cancellationToken) !=
                null)
            .WithMessage("Id is invalid.");

        RuleFor(v => v.Title)
            .MaximumLength(200)
            .WithMessage("Title must not exceed 200 characters.");

        RuleFor(v => v.FaultDescription)
            .MaximumLength(1000)
            .WithMessage("FaultDescription must not exceed 1000 characters.");

        RuleFor(v => v.ContractorId)
            .MustAsync(
                async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("ContractorId is invalid.");

        RuleFor(v => v.ManagerId)
            .MustAsync(
                async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("ManagerId is invalid.");

        RuleFor(v => v.SupervisorId)
            .MustAsync(
                async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("SupervisorId is invalid.");

        RuleFor(v => v.TechnicianId)
            .MustAsync(
                async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("TechnicianId is invalid.");

        RuleFor(v => v.Status)
            .IsInEnum()
            .WithMessage(
                "RepairRequestStatus is invalid, must be one of the following values: New, InProgress, Closed.");

        RuleFor(v => v.Priority)
            .IsInEnum()
            .WithMessage("RepairRequestPriority is invalid, must be one of the following values: Low, Medium, High.");

        RuleFor(v => v.ContractorNote)
            .MaximumLength(1000)
            .WithMessage("ContractorNote must not exceed 1000 characters.");

        RuleFor(v => v.MangerNote)
            .MaximumLength(1000)
            .WithMessage("MangerNote must not exceed 1000 characters.");

        RuleFor(v => v.SupervisorNote)
            .MaximumLength(1000)
            .WithMessage("SupervisorNote must not exceed 1000 characters.");

        RuleFor(v => v.TechnicianNote)
            .MaximumLength(1000)
            .WithMessage("TechnicianNote must not exceed 1000 characters.");
    }
}

public class UpdateRepairRequestCommandHandler(IApplicationDbContext context)
    : IRequestHandler<UpdateRepairRequestCommand, int>
{
    public async Task<int> Handle(UpdateRepairRequestCommand request, CancellationToken cancellationToken)
    {
        var repairRequest = await context.RepairRequests.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(RepairRequest), request.Id.ToString());
        }

        repairRequest.Title = request.Title ?? repairRequest.Title;
        repairRequest.FaultDescription = request.FaultDescription ?? repairRequest.FaultDescription;
        repairRequest.ContractorId = request.ContractorId ?? repairRequest.ContractorId;
        repairRequest.ContractorNote = request.ContractorNote ?? repairRequest.ContractorNote;
        repairRequest.ManagerId = request.ManagerId ?? repairRequest.ManagerId;
        repairRequest.MangerNote = request.MangerNote ?? repairRequest.MangerNote;
        repairRequest.SupervisorId = request.SupervisorId ?? repairRequest.SupervisorId;
        repairRequest.SupervisorNote = request.SupervisorNote ?? repairRequest.SupervisorNote;
        repairRequest.TechnicianId = request.TechnicianId ?? repairRequest.TechnicianId;
        repairRequest.TechnicianNote = request.TechnicianNote ?? repairRequest.TechnicianNote;
        repairRequest.Status = request.Status ?? repairRequest.Status;
        repairRequest.Priority = (RepairRequestPriority?)request.Priority ?? repairRequest.Priority;

        await context.SaveChangesAsync(cancellationToken);

        return repairRequest.Id;
    }
}
