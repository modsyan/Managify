using MMC.Application.Common.Interfaces;
using MMC.Application.PeriodicReports.Queries.Models;

namespace MMC.Application.PeriodicReports.Queries;

public record GetPeriodicReportDetailsQuery(int Id) : IRequest<PeriodicReportDto>
{
}

public class GetPeriodicReportDetailsQueryValidator : AbstractValidator<GetPeriodicReportDetailsQuery>
{
    public GetPeriodicReportDetailsQueryValidator()
    {
    }
}

public class GetPeriodicReportDetailsQueryHandler : IRequestHandler<GetPeriodicReportDetailsQuery, PeriodicReportDto>
{
    private readonly IApplicationDbContext _context;

    public GetPeriodicReportDetailsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<PeriodicReportDto> Handle(GetPeriodicReportDetailsQuery request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        throw new NotImplementedException();
    }
}
