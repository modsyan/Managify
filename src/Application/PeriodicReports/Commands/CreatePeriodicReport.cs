using MMC.Application.Common.Interfaces;

namespace MMC.Application.PeriodicReports.Commands;

public record CreatePeriodicReportCommand : IRequest<int>
{
}

public class CreatePeriodicReportCommandValidator : AbstractValidator<CreatePeriodicReportCommand>
{
    public CreatePeriodicReportCommandValidator()
    {
    }
}

public class CreatePeriodicReportCommandHandler : IRequestHandler<CreatePeriodicReportCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreatePeriodicReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<int> Handle(CreatePeriodicReportCommand request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        throw new NotImplementedException();
    }
}
