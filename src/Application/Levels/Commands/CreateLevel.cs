using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Levels.Commands;

public record CreateLevelCommand(
    string Name,
    string? Description,
    int FacilityId
) : IRequest<int>;

public class CreateLevelCommandValidator : AbstractValidator<CreateLevelCommand>
{
    public CreateLevelCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.FacilityId)
            .NotEmpty()
            .WithMessage("FacilityId is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .DependentRules(
                () => RuleFor(v => v.FacilityId)
                    .MustAsync(async (id, cancellationToken) =>
                        await context.Facilities.FindAsync([id], cancellationToken) != null)
                    .WithMessage("Facility does not exist.")
            );
    }
}

public class CreateLevelCommandHandler(IApplicationDbContext context) : IRequestHandler<CreateLevelCommand, int>
{
    public async Task<int> Handle(CreateLevelCommand request, CancellationToken cancellationToken)
    {
        var createdLevel = new Level
        {
            Name = request.Name,
            Description = request.Description,
            FacilityId = request.FacilityId
        };

        context.Levels.Add(createdLevel);

        await context.SaveChangesAsync(cancellationToken);

        return createdLevel.Id;
    }
}
