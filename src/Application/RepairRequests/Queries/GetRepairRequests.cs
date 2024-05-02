#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

using MMC.Application.Common.Interfaces;
using MMC.Application.RepairRequests.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.RepairRequests.Queries;

public record GetRepairRequestsQuery(
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
) : IRequest<RepairRequestsVm>;

public class GetRepairRequestsQueryValidator : AbstractValidator<GetRepairRequestsQuery>
{
    public GetRepairRequestsQueryValidator(IApplicationDbContext context)
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
                await context.ResourceAssetTypes.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("ResourceAssetTypeId is invalid.");

        RuleFor(v => v.ResourceAssetId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("ResourceAssetId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.ResourceAssets.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("ResourceAssetId is invalid.");
    }
}

public class GetRepairRequestsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetRepairRequestsQuery, RepairRequestsVm>
{
    public async Task<RepairRequestsVm> Handle(GetRepairRequestsQuery request, CancellationToken cancellationToken)
    {
        var repairRequests = await context.RepairRequests
            .Include(r => r.ResourceAsset).ThenInclude(r => r.Tags)
            .Include(r => r.ResourceAsset).ThenInclude(r => r.Area).ThenInclude(a => a.Level)
            .Where(r => (!request.StartDate.HasValue || r.Created >= request.StartDate) &&
                        (!request.EndDate.HasValue || r.Created <= request.EndDate) &&
                        (!request.FacilityId.HasValue || r.ResourceAsset.Area.Level.FacilityId == request.FacilityId) &&
                        (!request.LevelId.HasValue || r.ResourceAsset.Area.LevelId == request.LevelId) &&
                        (!request.AreaId.HasValue || r.ResourceAsset.AreaId == request.AreaId) &&
                        (!request.ResourceAssetTypeId.HasValue ||
                         r.ResourceAsset.Tags.Any(t => t.Id == request.ResourceAssetTypeId)) &&
                        (!request.ResourceAssetId.HasValue || r.ResourceAssetId == request.ResourceAssetId) &&
                        (string.IsNullOrEmpty(request.Search) ||
                         r.Title.Contains(request.Search) ||
                         r.FaultDescription.Contains(request.Search) ||
                         r.Author.Contains(request.Search) ||
                         (r.ContractorNote != null && r.ContractorNote.Contains(request.Search)) ||
                         (r.MangerNote != null && r.MangerNote.Contains(request.Search)) ||
                         (r.SupervisorNote != null && r.SupervisorNote.Contains(request.Search)) ||
                         (r.TechnicianNote != null && r.TechnicianNote.Contains(request.Search)))
            )
            .OrderByDescending(r => r.Created)
            .Skip((request.PageNumber - 1) * request.PageSize ?? 0)
            .Take(request.PageSize ?? 10)
            .ProjectTo<RepairRequestDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        
        return new RepairRequestsVm
        {
            RepairRequests = repairRequests,
            PageNumber = request.PageNumber ?? 1,
            PageSize = request.PageSize ?? 10,
            TotalPages = (int)Math.Ceiling(repairRequests.Count / (double)(request.PageSize ?? 10)),
            TotalItems = repairRequests.Count,
        };
    }
}
