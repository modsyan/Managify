using MMC.Application.Common.Interfaces;
using MMC.Application.ResourceAssetTypes.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssetTypes.Queries;

public record GetResourceAssetTypeDetailsQuery(int Id) : IRequest<ResourceAssetTypeDto>;

public class GetResourceAssetTypeDetailsQueryValidator : AbstractValidator<GetResourceAssetTypeDetailsQuery>
{
    public GetResourceAssetTypeDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssetTypes.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class GetResourceAssetTypeDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetResourceAssetTypeDetailsQuery, ResourceAssetTypeDto>
{
    public async Task<ResourceAssetTypeDto> Handle(GetResourceAssetTypeDetailsQuery request, CancellationToken cancellationToken)
    {
        var resourceAssetType = await context.ResourceAssetTypes
            .Where(ra => ra.Id == request.Id)
            .Include(ra=>ra.ResourceAssets)
            .ProjectTo<ResourceAssetTypeDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        
        return resourceAssetType ?? throw new NotFoundException(nameof(ResourceAssetType), request.Id.ToString());
    }
}
