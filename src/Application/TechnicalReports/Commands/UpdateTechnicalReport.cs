using MMC.Application.Common.Interfaces;

namespace MMC.Application.TechnicalReports.Commands;

public record UpdateTechnicalReportCommand(
    int Id,
    string Title,
    string Description,
    string TechnicianName
) : IRequest<int>
{
}

public class UpdateTechnicalReportCommandValidator : AbstractValidator<UpdateTechnicalReportCommand>
{
    public UpdateTechnicalReportCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.TechnicalReports.FindAsync(id) != null)
            .WithMessage("Id is invalid.");

        RuleFor(v => v.Title)
            .MaximumLength(200)
            .WithMessage("Title must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("Title is required.");

        RuleFor(v => v.Description)
            .MaximumLength(10000)
            .WithMessage("Description must not exceed 1000 characters.")
            .NotEmpty()
            .WithMessage("Description is required.");

        RuleFor(v => v.TechnicianName)
            .MaximumLength(200)
            .WithMessage("TechnicianName must not exceed 200 characters.")
            .NotEmpty()
            .WithMessage("TechnicianName is required.");
    }
}

public class UpdateTechnicalReportCommandHandler : IRequestHandler<UpdateTechnicalReportCommand, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateTechnicalReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<int> Handle(UpdateTechnicalReportCommand request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        throw new NotImplementedException();
    }
}
