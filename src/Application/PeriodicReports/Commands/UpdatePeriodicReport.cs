using MMC.Application.Common.Interfaces;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Application.PeriodicReports.Commands;

public record UpdatePeriodicReportCommand(int Id) : IRequest<int>
{
}

public class UpdatePeriodicReportCommandValidator : AbstractValidator<UpdatePeriodicReportCommand>
{
    public UpdatePeriodicReportCommandValidator()
    {
    }
}

public class UpdatePeriodicReportCommandHandler : IRequestHandler<UpdatePeriodicReportCommand, int>
{
    private readonly IApplicationDbContext _context;

    public UpdatePeriodicReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdatePeriodicReportCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
