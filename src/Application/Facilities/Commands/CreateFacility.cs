using MMC.Application.Common.Interfaces;
using MMC.Application.Facilities.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Facilities.Commands;

public record CreateFacilityCommand(
    string Name,
    string? Description,
    string Address
) : IRequest<FacilityDto>;

public class CreateFacilityCommandValidator : AbstractValidator<CreateFacilityCommand>
{
    public CreateFacilityCommandValidator()
    {
        RuleFor(v => v.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.Address)
            .NotEmpty()
            .WithMessage("Address is required.")
            .MaximumLength(200)
            .WithMessage("Address must not exceed 200 characters.");
    }
}

public class CreateFacilityCommandHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<CreateFacilityCommand, FacilityDto>
{
    public async Task<FacilityDto> Handle(CreateFacilityCommand request, CancellationToken cancellationToken)
    {
        var createdFacility = new Facility
        {
            Name = request.Name,
            Description = request.Description,
            Address = request.Address
        };

        context.Facilities.Add(createdFacility);

        await context.SaveChangesAsync(cancellationToken);

        var facility = mapper.Map<FacilityDto>(createdFacility);
        
        return facility;
    }
}
