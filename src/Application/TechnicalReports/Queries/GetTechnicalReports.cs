using MMC.Application.Common.Interfaces;
using MMC.Application.TechnicalReports.Queries.Models;

namespace MMC.Application.TechnicalReports.Queries;

public record GetTechnicalReportsQuery(
    int? PageNumber,
    int? PageSize,
    DateTime? StartDate,
    DateTime? EndDate,
    int? FacilityId,
    int? LevelId,
    int? AreaId,
    int? ResourceAssetTypeId,
    int? ResourceAssetId,
    string? Search
) : IRequest<TechnicalReportVm>;

public class GetTechnicalReportsQueryValidator : AbstractValidator<GetTechnicalReportsQuery>
{
    public GetTechnicalReportsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.PageNumber)
            .GreaterThan(0)
            .WithMessage("PageNumber must be greater than 0.");

        RuleFor(v => v.PageSize)
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0.");

        RuleFor(v => v.StartDate)
            .GreaterThan(new DateTime(2000, 1, 1))
            .WithMessage("StartDate Start Range is Invalid.");

        RuleFor(v => v.EndDate)
            .LessThanOrEqualTo(DateTime.Now)
            .WithMessage("EndDate End Range is Invalid.");

        RuleFor(v => v.FacilityId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("FacilityId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Facilities.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("FacilityId is invalid.");

        RuleFor(v => v.LevelId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("LevelId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Levels.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("LevelId is invalid.");

        RuleFor(v => v.AreaId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("AreaId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Areas.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("AreaId is invalid.");

        RuleFor(v => v.ResourceAssetTypeId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("ResourceAssetTypeId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.ResourceAssetTypes.FindAsync([id],
                    cancellationToken: cancellationToken) != null)
            .WithMessage("ResourceAssetTypeId is invalid.");

        RuleFor(v => v.ResourceAssetId)
            .MustAsync(async (id, cancellationToken) =>
                await context.ResourceAssets.FindAsync(new object?[] { id }, cancellationToken: cancellationToken) !=
                null)
            .WithMessage("ResourceAssetId is invalid.");

        RuleFor(v => v.Search)
            .MaximumLength(200)
            .WithMessage("Search must not exceed 200 characters.");
    }
}

public class GetTechnicalReportsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetTechnicalReportsQuery, TechnicalReportVm>
{
    public async Task<TechnicalReportVm> Handle(GetTechnicalReportsQuery request, CancellationToken cancellationToken)
    {
        var technicalReports = context.TechnicalReports
            .Include(tr => tr.ResourceAsset).ThenInclude(ra => ra.Tags)
            .Include(tr => tr.ResourceAsset.Area)
            .Include(tr => tr.ResourceAsset.Area.Level)
            .Include(tr => tr.ResourceAsset.Area.Level.Facility)
            .Include(tr => tr.Attachments).ThenInclude(a => a.UploadedFile)
            .AsQueryable();

        if (request.StartDate.HasValue)
            technicalReports = technicalReports.Where(tr => tr.Created >= request.StartDate);

        if (request.EndDate.HasValue)
            technicalReports = technicalReports.Where(tr => tr.Created <= request.EndDate);

        if (request.FacilityId.HasValue)
            technicalReports =
                technicalReports.Where(tr => tr.ResourceAsset.Area.Level.FacilityId == request.FacilityId);

        if (request.LevelId.HasValue)
            technicalReports = technicalReports.Where(tr => tr.ResourceAsset.Area.LevelId == request.LevelId);

        if (request.AreaId.HasValue)
            technicalReports = technicalReports.Where(tr => tr.ResourceAsset.AreaId == request.AreaId);

        if (request.ResourceAssetTypeId.HasValue)
            technicalReports =
                technicalReports.Where(tr => tr.ResourceAsset.Tags.Any(t => t.Id == request.ResourceAssetTypeId));

        if (request.ResourceAssetId.HasValue)
            technicalReports = technicalReports.Where(tr => tr.ResourceAssetId == request.ResourceAssetId);

        if (!string.IsNullOrEmpty(request.Search))
            technicalReports = technicalReports.Where(tr => tr.Title.Contains(request.Search));

        var technicalReportList = await technicalReports
            .OrderByDescending(tr => tr.Created)
            .ProjectTo<TechnicalReportDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        var technicalReportVm = new TechnicalReportVm
        {
            TechnicalReports = technicalReportList,
            PageNumber = request.PageNumber ?? 1,
            PageSize = request.PageSize ?? 10,
            TotalPages = (int)Math.Ceiling(technicalReportList.Count / (double)(request.PageSize ?? 10)),
            TotalItems = technicalReportList.Count,
        };
        
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 

        return technicalReportVm;
    }
}
