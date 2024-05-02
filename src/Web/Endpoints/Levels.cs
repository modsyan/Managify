using Microsoft.AspNetCore.Mvc;
using MMC.Application.Levels.Commands;
using MMC.Application.Levels.Queries;

namespace MMC.Web.Endpoints;

public class Levels : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetLevels, "{facilityId}")
            .MapGet(GetLevel, "details/{id}")
            .MapPost(CreateLevel)
            .MapPut(UpdateLevel, "{id}")
            .MapDelete(DeleteLevel, "{id}");
    }

    public async Task<IResult> GetLevels(ISender sender, [FromRoute] int facilityId, [FromQuery] int? pageNumber,
        [FromQuery] int? pageSize)
    {
        var result = await sender.Send(new GetLevelsQuery(facilityId, pageNumber, pageSize));

        return Results.Ok(result);
    }

    public async Task<IResult> GetLevel(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetLevelDetailsQuery(id));

        return Results.Ok(result);
    }


    public async Task<int> CreateLevel(ISender sender, [FromBody] CreateLevelCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateLevel(ISender sender, [FromRoute] int id,
        [FromBody] UpdateLevelCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteLevel(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteLevelCommand(id));
        return Results.NoContent();
    }
}
