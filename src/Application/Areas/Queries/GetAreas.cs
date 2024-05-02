using MMC.Application.Areas.Queries.Models;
using MMC.Application.Common.Interfaces;

namespace MMC.Application.Areas.Queries;

public record GetAreasQuery(long LevelId, int? PageNumber, int? PageSize) : IRequest<AreaVm>;

public class GetAreasQueryValidator : AbstractValidator<GetAreasQuery>
{
    public GetAreasQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.LevelId)
            .NotEmpty()
            .WithMessage("LevelId is required.")
            .GreaterThan(0)
            .WithMessage("LevelId must be greater than 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Levels.FindAsync(id) != null)
            .WithMessage("Level does not exist.");
        
        RuleFor(v => v.PageNumber)
            .GreaterThan(0)
            .WithMessage("PageNumber must be greater than 0");

        RuleFor(v => v.PageSize)
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0");
    }
}

public class GetAreasQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetAreasQuery, AreaVm>
{
    public async Task<AreaVm> Handle(GetAreasQuery request, CancellationToken cancellationToken)
    {
        var list = await context.Areas
            .Where(a => a.LevelId == request.LevelId)
            .Skip((request.PageNumber - 1) * request.PageSize ?? 0)
            .Take(request.PageSize ?? 10)
            .ProjectTo<AreaDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        var vm = new AreaVm { List = list, Count = list.Count };

        return vm;
    }
}
