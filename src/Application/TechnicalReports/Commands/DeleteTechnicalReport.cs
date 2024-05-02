using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.TechnicalReports.Commands;

public record DeleteTechnicalReportCommand(int Id) : IRequest<int>;

public class DeleteTechnicalReportCommandValidator : AbstractValidator<DeleteTechnicalReportCommand>
{
    public DeleteTechnicalReportCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.TechnicalReports.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class DeleteTechnicalReportCommandHandler(IApplicationDbContext context)
    : IRequestHandler<DeleteTechnicalReportCommand, int>
{
    public async Task<int> Handle(DeleteTechnicalReportCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.TechnicalReports.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(TechnicalReport), request.Id.ToString());
        }

        context.TechnicalReports.Remove(entity);

        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
