using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.TechnicalReports.Commands;

public record CreateTechnicalReportCommand(
    string Title,
    string Description,
    string TechnicianName,
    int ResourceAssetId,
    List<string[]> Attachments
) : IRequest<int>;

public class CreateTechnicalReportCommandValidator : AbstractValidator<CreateTechnicalReportCommand>
{
    public CreateTechnicalReportCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .WithMessage("Title must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Title is required.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.")
            .NotEmpty()
            .WithMessage("Description is required.");

        RuleFor(v => v.TechnicianName)
            .MaximumLength(200)
            .WithMessage("TechnicianName must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("TechnicianName is required.");

        RuleFor(v => v.ResourceAssetId)
            .NotEmpty()
            .WithMessage("ResourceAssetId is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssets.FindAsync(id) != null)
            .WithMessage("ResourceAssetId is invalid.");
    }
}

public class CreateTechnicalReportCommandHandler(IApplicationDbContext context)
    : IRequestHandler<CreateTechnicalReportCommand, int>
{
    public async Task<int> Handle(CreateTechnicalReportCommand request, CancellationToken cancellationToken)
    {
        var entity = new TechnicalReport
        {
            Title = request.Title,
            Description = request.Description,
            TechnicianName = request.TechnicianName,
            ResourceAssetId = request.ResourceAssetId,
        };

        await context.TechnicalReports.AddAsync(entity, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
