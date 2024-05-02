using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;

namespace MMC.Application.Areas.Commands;

public record CreateAreaCommand(string Name, string? Description, int LevelId) : IRequest<int>;

public class CreateAreaCommandValidator : AbstractValidator<CreateAreaCommand>
{
    public CreateAreaCommandValidator()
    {
        RuleFor(v => v.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000)
            .WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.LevelId)
            .NotEmpty()
            .WithMessage("LevelId is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Id must be greater than or equal to 0.");
    }
}

public class CreateAreaCommandHandler(IApplicationDbContext context) : IRequestHandler<CreateAreaCommand, int>
{
    public async Task<int> Handle(CreateAreaCommand request, CancellationToken cancellationToken)
    {
        var createdArea = new Area
        {
            Name = request.Name, Description = request.Description, LevelId = request.LevelId
        };

        context.Areas.Add(createdArea);

        await context.SaveChangesAsync(cancellationToken);

        return createdArea.Id;
    }
}
