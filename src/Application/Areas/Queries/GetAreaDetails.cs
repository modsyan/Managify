using MMC.Application.Areas.Queries.Models;
using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Areas.Queries;

public record GetAreaDetailsQuery(int Id) : IRequest<AreaDto>;

public class GetAreaDetailsQueryValidator : AbstractValidator<GetAreaDetailsQuery>
{
    public GetAreaDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Areas.FindAsync([id], cancellationToken) != null)
            .WithMessage("Area does not exist.");
    }
}

public class GetAreaDetailsQueryHandler : IRequestHandler<GetAreaDetailsQuery, AreaDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUser _user;

    public GetAreaDetailsQueryHandler(IApplicationDbContext context, IMapper mapper, IUser user)
    {
        _context = context;
        _mapper = mapper;
        _user = user;
    }

    public async Task<AreaDto> Handle(GetAreaDetailsQuery request, CancellationToken cancellationToken)
    {
        var area = await _context.Areas
            .Where(x => x.Id == request.Id)
            .ProjectTo<AreaDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (area is null)
        {
            throw new NotFoundException(nameof(Area), request.Id.ToString());
        }

        return area;
    }
}
