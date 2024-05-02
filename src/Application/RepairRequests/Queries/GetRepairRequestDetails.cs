using MMC.Application.Common.Interfaces;
using MMC.Application.RepairRequests.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.RepairRequests.Queries;

public record GetRepairRequestDetailsQuery(int Id) : IRequest<RepairRequestDto>;

public class GetRepairRequestDetailsQueryValidator : AbstractValidator<GetRepairRequestDetailsQuery>
{
    public GetRepairRequestDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) =>
                await context.RepairRequests.FindAsync([id], cancellationToken: cancellationToken) != null)
            .WithMessage("Id is invalid.");
    }
}

public class GetRepairRequestDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetRepairRequestDetailsQuery, RepairRequestDto>
{
    public async Task<RepairRequestDto> Handle(GetRepairRequestDetailsQuery request,
        CancellationToken cancellationToken)
    {
        var repairRequest = await context.RepairRequests
            .Include(r => r.ResourceAsset)
            .Where(r => r.Id == request.Id)
            .ProjectTo<RepairRequestDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);

        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(RepairRequest), request.Id.ToString());
        }
        
        // TODO: Remove circular reference by separate DtoDetails from abstracted one 
        
        return repairRequest;
    }
}
