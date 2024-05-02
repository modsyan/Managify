using MMC.Application.Common.Interfaces;

namespace MMC.Application.PeriodicReports.Commands;

public record DeletePeriodicReportCommand(int Id) : IRequest<int>
{
}

public class DeletePeriodicReportCommandValidator : AbstractValidator<DeletePeriodicReportCommand>
{
    public DeletePeriodicReportCommandValidator()
    {
    }
}

public class DeletePeriodicReportCommandHandler : IRequestHandler<DeletePeriodicReportCommand, int>
{
    private readonly IApplicationDbContext _context;

    public DeletePeriodicReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<int> Handle(DeletePeriodicReportCommand request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        throw new NotImplementedException();
    }
}
