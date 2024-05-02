using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MMC.Application.Facilities.Commands;
using MMC.Application.Facilities.Queries;
using MMC.Application.Facilities.Queries.Models;

namespace MMC.Web.Endpoints;

public class Facilities : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetFacilities)
            .MapGet(GetFacility, "details/{id}")
            .MapPost(CreateFacility)
            .MapPut(UpdateFacility, "{id}")
            .MapDelete(DeleteFacility, "{id}");
    }

    private static async Task<Ok<FacilityVm>> GetFacilities(ISender sender, [FromQuery] int? pageNumber,
        [FromQuery] int? pageSize)
    {
        var result = await sender.Send(new GetFacilitiesQuery(pageNumber = 1, pageSize = 10));

        return TypedResults.Ok(result);
    }

    private static async Task<Ok<FacilityDto>> GetFacility(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetFacilityDetailsQuery(id));

        return TypedResults.Ok(result);
    }

    private static async Task<Created<FacilityDto>> CreateFacility(ISender sender, [FromBody] CreateFacilityCommand command)
    {
        var res = await sender.Send(command);
        
        return TypedResults.Created($"/api/Facilities/details/{res.Id}", res);
    }

    private static async Task<Results<Ok<FacilityDto>, BadRequest>> UpdateFacility(ISender sender, [FromRoute] int id,
        [FromBody] UpdateFacilityCommand command)
    {
        if (id != command.Id) return TypedResults.BadRequest();
        
        var result = await sender.Send(command);

        return TypedResults.Ok(result);

    }

    private static async Task<NoContent> DeleteFacility(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteFacilityCommand(id));
        return TypedResults.NoContent();
    }
}
