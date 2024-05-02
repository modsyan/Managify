using Microsoft.Extensions.Options;
using MMC.Application.Common.Interfaces;
using MMC.Application.Facilities.Queries.Models;
using MMC.Domain.Entities;

#pragma warning disable CS1998
namespace MMC.Application.Facilities.Commands;

public record UpdateFacilityCommand(
    int Id,
    string? Name,
    string? Description
) : IRequest<FacilityDto>;

public class UpdateFacilityCommandValidator : AbstractValidator<UpdateFacilityCommand>
{
    public UpdateFacilityCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Facilities.FindAsync([id], cancellationToken) != null)
            .WithMessage("Facility does not exist.");

        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");
    }
}

public class UpdateFacilityCommandHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<UpdateFacilityCommand, FacilityDto>
{
    public async Task<FacilityDto> Handle(UpdateFacilityCommand request, CancellationToken cancellationToken)
    {
        var facility = await context.Facilities.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (facility == null)
        {
            throw new NotFoundException(nameof(Facility), request.Id.ToString());
        }

        facility.Name = request.Name ?? facility.Name;
        facility.Description = request.Description ?? facility.Description;

        await context.SaveChangesAsync(cancellationToken);
        
        var result = mapper.Map<FacilityDto>(facility);

        return result;
    }
}
