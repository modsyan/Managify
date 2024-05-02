using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Levels.Commands;

public record UpdateLevelCommand(
    int Id,
    string? Name,
    string? Description,
    int? FacilityId
) : IRequest<int>
{
}

public class UpdateLevelCommandValidator : AbstractValidator<UpdateLevelCommand>
{
    public UpdateLevelCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Levels.FindAsync(new object?[] { id }, cancellationToken) != null)
            .WithMessage("Level does not exist.");

        RuleFor(v => v.Name)
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
                        await context.Facilities.FindAsync(new object?[] { id }, cancellationToken) != null)
                    .WithMessage("Facility does not exist.")
            );
    }
}

public class UpdateLevelCommandHandler(IApplicationDbContext context) : IRequestHandler<UpdateLevelCommand, int>
{
    public async Task<int> Handle(UpdateLevelCommand request, CancellationToken cancellationToken)
    {
        var level = await context.Levels.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (level is null)
            throw new NotFoundException(nameof(Level), request.Id.ToString());

        level.Name = request.Name ?? level.Name;
        level.Description = request.Description ?? level.Description;
        level.FacilityId = request.FacilityId ?? level.FacilityId;

        await context.SaveChangesAsync(cancellationToken);

        return level.Id;
    }
}
