using MMC.Application.Common.Interfaces;
using MMC.Application.Levels.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Levels.Queries;

public record GetLevelDetailsQuery(int Id) : IRequest<LevelDto>;

public class GetLevelDetailsQueryValidator : AbstractValidator<GetLevelDetailsQuery>
{
    public GetLevelDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Levels.FindAsync(id) != null)
            .WithMessage("Level does not exist.");
    }
}

public class GetLevelDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetLevelDetailsQuery, LevelDto>
{
    public async Task<LevelDto> Handle(GetLevelDetailsQuery request, CancellationToken cancellationToken)
    {
        var level = await context.Levels
            .Include(l=>l.Facility)
            .Where(l => l.Id == request.Id)
            .ProjectTo<LevelDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (level == null)
        {
            throw new NotFoundException(nameof(Level), request.Id.ToString());
        }

        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        
        return level;
    }
}
