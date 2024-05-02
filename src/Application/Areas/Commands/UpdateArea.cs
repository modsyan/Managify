using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Areas.Commands;

public record UpdateAreaCommand(int Id, string? Name, string? Description, int? LevelId) : IRequest<int>;

public class UpdateAreaCommandValidator : AbstractValidator<UpdateAreaCommand>
{
    public UpdateAreaCommandValidator(IApplicationDbContext context)
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .MustAsync(async (id, cancellationToken) =>
                await context.Areas.FindAsync([id], cancellationToken) != null)
            .WithMessage("Area does not exist.");

        RuleFor(v => v.Name)
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.LevelId)
            .NotEmpty()
            .WithMessage("LevelId is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.")
            .DependentRules(
                () => RuleFor(v => v.LevelId)
                    .MustAsync(async (id, cancellationToken) =>
                        await context.Levels.FindAsync([id], cancellationToken) != null)
                    .WithMessage("Level does not exist.")
            );
    }
}

public class UpdateAreaCommandHandler(IApplicationDbContext context) : IRequestHandler<UpdateAreaCommand, int>
{
    public async Task<int> Handle(UpdateAreaCommand request, CancellationToken cancellationToken)
    {
        var area = await context.Areas.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (area == null)
        {
            throw new NotFoundException(nameof(Area), request.Id.ToString());
        }

        area.Name = request.Name ?? area.Name;
        area.Description = request.Description ?? area.Description;
        area.LevelId = request.LevelId ?? area.LevelId;

        await context.SaveChangesAsync(cancellationToken);

        return area.Id;
    }
}
