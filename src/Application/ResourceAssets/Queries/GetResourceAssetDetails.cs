#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
using MMC.Application.Common.Interfaces;
using MMC.Application.ResourceAssets.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssets.Queries;

public record GetResourceAssetDetailsQuery(int Id) : IRequest<ResourceAssetDto>
{
}

public class GetResourceAssetDetailsQueryValidator : AbstractValidator<GetResourceAssetDetailsQuery>
{
    public GetResourceAssetDetailsQueryValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .MustAsync(async (id, cancellationToken) => await context.ResourceAssets.FindAsync(id) != null)
            .WithMessage("Id is invalid.");
    }
}

public class GetResourceAssetDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetResourceAssetDetailsQuery, ResourceAssetDto>
{
    public async Task<ResourceAssetDto> Handle(GetResourceAssetDetailsQuery request,
        CancellationToken cancellationToken)
    {
        var resourceAsset = await context.ResourceAssets
            .Include(ra => ra.Area).ThenInclude(a => a.Level)
            .Include(ra => ra.Tags)
            .Include(ra => ra.Attachments).ThenInclude(ra => ra.UploadedFile)
            .Where(ra => ra.Id == request.Id)
            .ProjectTo<ResourceAssetDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        return resourceAsset ?? throw new NotFoundException(nameof(ResourceAsset), request.Id.ToString());
    }
}
