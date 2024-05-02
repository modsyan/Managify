#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
using MMC.Application.Common.Interfaces;
using MMC.Application.ResourceAssets.Queries.Models;

namespace MMC.Application.ResourceAssets.Queries;

public record GetResourceAssetsQuery(
    int? ResourceAssetTypeId,
    int? PageNumber,
    int? PageSize,
    int? LevelId,
    int? FacilityId,
    int? AreaId
) : IRequest<ResourceAssetVm>
{
}

public class GetResourceAssetsQueryValidator : AbstractValidator<GetResourceAssetsQuery>
{
    public GetResourceAssetsQueryValidator()
    {
        RuleFor(v => v.ResourceAssetTypeId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("ResourceAssetTypeId must be greater than or equal to 0.");

        RuleFor(v => v.PageNumber)
            .GreaterThanOrEqualTo(1)
            .WithMessage("PageNumber must be greater than or equal to 1.");

        RuleFor(v => v.PageSize)
            .GreaterThanOrEqualTo(1)
            .WithMessage("PageSize must be greater than or equal to 1.");

        RuleFor(v => v.LevelId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("LevelId must be greater than or equal to 0.");

        RuleFor(v => v.FacilityId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("FacilityId must be greater than or equal to 0.");

        RuleFor(v => v.AreaId)
            .GreaterThanOrEqualTo(0)
            .WithMessage("AreaId must be greater than or equal to 0.");
    }
}

public class GetResourceAssetsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetResourceAssetsQuery, ResourceAssetVm>
{
    public async Task<ResourceAssetVm> Handle(GetResourceAssetsQuery request, CancellationToken cancellationToken)
    {
        var resourceAssets = await context.ResourceAssets
            .Include(ra => ra.Area).ThenInclude(a=>a.Level)
            .Where(ra => request.ResourceAssetTypeId == null || ra.Tags.Any(t => t.Id == request.ResourceAssetTypeId))
            .Where(ra => request.LevelId == null || ra.Area.LevelId == request.LevelId)
            .Where(ra => request.FacilityId == null || ra.Area.Level.FacilityId == request.FacilityId)
            .Where(ra => request.AreaId == null || ra.AreaId == request.AreaId)
            .ProjectTo<ResourceAssetDto>(mapper.ConfigurationProvider)
            .Skip((request.PageNumber - 1) * request.PageSize ?? 0)
            .Take(request.PageSize ?? 10)
            .ToListAsync(cancellationToken);
        
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 

        return new ResourceAssetVm { List = resourceAssets, Count = resourceAssets.Count };
    }
}
