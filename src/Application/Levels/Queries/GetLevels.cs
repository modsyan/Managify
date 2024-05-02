using MMC.Application.Common.Interfaces;
using MMC.Application.Levels.Queries.Models;

namespace MMC.Application.Levels.Queries;

public record GetLevelsQuery(
    int FacilityId,
    int? PageNumber,
    int? PageSize
) : IRequest<LevelVm>;

public class GetLevelsQueryValidator : AbstractValidator<GetLevelsQuery>
{
    public GetLevelsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.FacilityId)
            .NotEmpty()
            .WithMessage("FacilityId is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("FacilityId must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Facilities.FindAsync(id) != null)
            .WithMessage("Facility does not exist.");

        RuleFor(v => v.PageNumber)
            .GreaterThanOrEqualTo(1)
            .WithMessage("PageNumber must be greater than or equal to 1.");

        RuleFor(v => v.PageSize)
            .GreaterThanOrEqualTo(1)
            .WithMessage("PageSize must be greater than or equal to 1.");
    }
}

public class GetLevelsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetLevelsQuery, LevelVm>
{
    public async Task<LevelVm> Handle(GetLevelsQuery request, CancellationToken cancellationToken)
    {
        var levels = await context.Levels
            .Include(l => l.Facility)
            .Include(l => l.Areas)
            .Where(l => l.FacilityId == request.FacilityId)
            .ProjectTo<LevelDto>(mapper.ConfigurationProvider)
            .Skip((request.PageNumber - 1) * request.PageSize ?? 0)
            .Take(request.PageSize ?? 10)
            .ToListAsync(cancellationToken);

        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        levels.ForEach(l => l.Facility.Levels = null!);

        return new LevelVm { List = levels, Count = levels.Count };
    }
}
