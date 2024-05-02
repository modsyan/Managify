using MMC.Application.Common.Interfaces;
using MMC.Application.TechnicalReports.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.TechnicalReports.Queries;

public record GetTechnicalReportDetailsQuery(int Id) : IRequest<TechnicalReportDto>;

public class GetTechnicalReportDetailsQueryValidator : AbstractValidator<GetTechnicalReportDetailsQuery>
{
    public GetTechnicalReportDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.TechnicalReports.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class GetTechnicalReportDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetTechnicalReportDetailsQuery, TechnicalReportDto>
{
    public async Task<TechnicalReportDto> Handle(GetTechnicalReportDetailsQuery request,
        CancellationToken cancellationToken)
    {
        var technicalReport = await context.TechnicalReports
            .Include(tr => tr.Attachments).ThenInclude(a => a.UploadedFile)
            .Include(tr => tr.ResourceAsset).ThenInclude(a => a.Tags)
            .Where(tr => tr.Id == request.Id)
            .ProjectTo<TechnicalReportDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);
        
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 

        return technicalReport ?? throw new NotFoundException(nameof(TechnicalReport), request.Id.ToString());
    }
}
