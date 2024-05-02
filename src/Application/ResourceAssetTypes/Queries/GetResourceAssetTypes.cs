using MMC.Application.Common.Interfaces;
using MMC.Application.ResourceAssetTypes.Queries.Models;


namespace MMC.Application.ResourceAssetTypes.Queries;

public record GetResourceAssetTypesQuery : IRequest<ResourceAssetTypeVm>;

public class GetResourceAssetTypesQueryValidator : AbstractValidator<GetResourceAssetTypesQuery>
{
    public GetResourceAssetTypesQueryValidator()
    {
    }
}

public class GetResourceAssetTypesQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetResourceAssetTypesQuery, ResourceAssetTypeVm>
{
    public async Task<ResourceAssetTypeVm> Handle(GetResourceAssetTypesQuery request, CancellationToken cancellationToken)
    {
        var resourceAssetTypes = await context.ResourceAssetTypes
            .ProjectTo<ResourceAssetTypeDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        // TODO: Remove circular reference by separate DtoDetails from abstracted one 

        return new ResourceAssetTypeVm
        {
            List = resourceAssetTypes,
            Count = resourceAssetTypes.Count
        };
    }
}

