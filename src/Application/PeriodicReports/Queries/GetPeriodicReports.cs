using MMC.Application.Common.Interfaces;
using MMC.Application.PeriodicReports.Queries.Models;

namespace MMC.Application.PeriodicReports.Queries;

public record GetPeriodicReportsQuery : IRequest<PeriodicReportVm>
{
}

public class GetPeriodicReportsQueryValidator : AbstractValidator<GetPeriodicReportsQuery>
{
    public GetPeriodicReportsQueryValidator()
    {
    }
}

public class GetPeriodicReportsQueryHandler : IRequestHandler<GetPeriodicReportsQuery, PeriodicReportVm>
{
    private readonly IApplicationDbContext _context;

    public GetPeriodicReportsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<PeriodicReportVm> Handle(GetPeriodicReportsQuery request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        throw new NotImplementedException();
    }
}
