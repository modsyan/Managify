using Microsoft.AspNetCore.Mvc;
using MMC.Application.Areas.Commands;
using MMC.Application.Areas.Queries;

namespace MMC.Web.Endpoints;

public class Areas : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetAreas, "{levelId}")
            .MapGet(GetArea, "details/{id}")
            .MapPost(CreateArea)
            .MapPut(UpdateArea, "{id}")
            .MapDelete(DeleteArea, "{id}");
    }

    public async Task<IResult> GetAreas(ISender sender, [FromRoute] int levelId, [FromQuery] int? pageNumber,
        [FromQuery] int? pageSize)
    {
        var result = await sender.Send(new GetAreasQuery(levelId, pageNumber, pageSize));

        return Results.Ok(result);
    }

    public async Task<IResult> GetArea(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetAreaDetailsQuery(id));

        return Results.Ok(result);
    }

    public async Task<int> CreateArea(ISender sender, [FromBody] CreateAreaCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateArea(ISender sender, [FromRoute] int id, [FromBody] UpdateAreaCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteArea(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteAreaCommand(id));
        return Results.NoContent();
    }
}
