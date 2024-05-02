using MMC.Application.Common.Interfaces;
using MMC.Application.Facilities.Queries.Models;

namespace MMC.Application.Facilities.Queries;

public record GetFacilitiesQuery(int? PageNumber, int? PageSize) : IRequest<FacilityVm>;

public class GetFacilitiesQueryValidator : AbstractValidator<GetFacilitiesQuery>
{
    public GetFacilitiesQueryValidator()
    {
        RuleFor(v => v.PageNumber)
            .GreaterThan(0)
            .WithMessage("PageNumber must be greater than 0");

        RuleFor(v => v.PageSize)
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0");
    }
}

public class GetFacilitiesQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetFacilitiesQuery, FacilityVm>
{
    public async Task<FacilityVm> Handle(GetFacilitiesQuery request, CancellationToken cancellationToken)
    {
        var skip = (request.PageNumber - 1) * request.PageSize ?? 0;
        var take = request.PageSize ?? 10;
        
        var list = await context.Facilities
            .Skip(skip)
            .Take(take)
            .Include(f=>f.Levels)
            .ProjectTo<FacilityDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
        
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        // list.ForEach(f => f.Levels.ForEach(l => l.Facility = null!));

        var vm = new FacilityVm { List = list, Count = list.Count };

        return vm;
    }
}
