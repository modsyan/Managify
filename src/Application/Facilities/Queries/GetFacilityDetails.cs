using MMC.Application.Common.Interfaces;
using MMC.Application.Facilities.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Facilities.Queries;

public record GetFacilityDetailsQuery(int Id) : IRequest<FacilityDto>
{
}

public class GetFacilityDetailsQueryValidator : AbstractValidator<GetFacilityDetailsQuery>
{
    public GetFacilityDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Facilities.FindAsync([id], cancellationToken) != null)
            .WithMessage("Facility does not exist.");
    }
}

public class GetFacilityDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetFacilityDetailsQuery, FacilityDto>
{
    public async Task<FacilityDto> Handle(GetFacilityDetailsQuery request, CancellationToken cancellationToken)
    {
        var facility = await context.Facilities
            .Include(f => f.Levels)
            .ProjectTo<FacilityDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);

        if (facility == null)
        {
            throw new NotFoundException(nameof(Facility), request.Id.ToString());
        }
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 

        return facility;
    }
}
