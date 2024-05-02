using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Domain.Enums;

namespace MMC.Application.RepairRequests.Commands;

public record CreateRepairRequestCommand(
    string Title,
    string FaultDescription,
    string Author,
    string ContractorId,
    string? ContractorNote,
    string? ManagerId,
    string? MangerNote,
    string? SupervisorId,
    string? SupervisorNote,
    string? TechnicianId,
    string? TechnicianNote,
    int ResourceAssetId,
    RepairRequestPriority? Priority
) : IRequest<int>;

public class CreateRepairRequestCommandValidator : AbstractValidator<CreateRepairRequestCommand>
{
    public CreateRepairRequestCommandValidator(IApplicationDbContext context, IIdentityService identityService)
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .WithMessage("Title must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Title is required.");

        RuleFor(v => v.FaultDescription)
            .MaximumLength(1000)
            .WithMessage("FaultDescription must not exceed 1000 characters.")
            .NotEmpty()
            .WithMessage("FaultDescription is required.");

        RuleFor(v => v.Author)
            .MaximumLength(200)
            .WithMessage("Author must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Author is required.");

        RuleFor(v => v.ContractorId)
            .MustAsync(async (id, cancellationToken) => await identityService.GetUserNameAsync(id) != null)
            .WithMessage("ContractorId is invalid.");

        RuleFor(v => v.ManagerId)
            .MustAsync(async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("ManagerId is invalid.");

        RuleFor(v => v.SupervisorId)
            .MustAsync(async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("SupervisorId is invalid.");

        RuleFor(v => v.TechnicianId)
            .MustAsync(async (id, cancellationToken) => id == null || await identityService.GetUserNameAsync(id) != null)
            .WithMessage("TechnicianId is invalid.");
        
        RuleFor(v=> v.ContractorNote)
            .MaximumLength(1000)
            .WithMessage("ContractorNote must not exceed 1000 characters.");
        
        RuleFor(v=> v.MangerNote)
            .MaximumLength(1000)
            .WithMessage("MangerNote must not exceed 1000 characters.");
        
        RuleFor(v=> v.SupervisorNote)
            .MaximumLength(1000)
            .WithMessage("SupervisorNote must not exceed 1000 characters.");
        
        RuleFor(v => v.Priority)
            .IsInEnum()
            .WithMessage("Priority is invalid.");

        RuleFor(v => v.ResourceAssetId)
            .NotEmpty()
            .WithMessage("ResourceAssetId is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssets.FindAsync(id) != null)
            .WithMessage("ResourceAssetId is invalid.");
    }
}

public class CreateRepairRequestCommandHandler(IApplicationDbContext context)
    : IRequestHandler<CreateRepairRequestCommand, int>
{
    public async Task<int> Handle(CreateRepairRequestCommand request, CancellationToken cancellationToken)
    {
        var entity = new RepairRequest
        {
            Title = request.Title,
            FaultDescription = request.FaultDescription,
            Author = request.Author,
            ContractorId = request.ContractorId,
            ContractorNote = request.ContractorNote,
            ManagerId = request.ManagerId,
            MangerNote = request.MangerNote,
            SupervisorId = request.SupervisorId,
            SupervisorNote = request.SupervisorNote,
            TechnicianId = request.TechnicianId,
            TechnicianNote = request.TechnicianNote,
            ResourceAssetId = request.ResourceAssetId,
            Priority = request.Priority
        };

        context.RepairRequests.Add(entity);

        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
