using Microsoft.AspNetCore.Mvc;
using MMC.Application.RepairRequests.Commands;
using MMC.Application.RepairRequests.Queries;

namespace MMC.Web.Endpoints;

public class RepairRequests : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetRepairRequests)
            .MapGet(GetRepairRequest, "details/{id}")
            .MapPost(CreateRepairRequest)
            .MapPut(UpdateRepairRequest, "{id}")
            .MapDelete(DeleteRepairRequest, "{id}")
            .MapPut(ApproveRepairRequest, "Approve/{id}")
            .MapPut(RejectRepairRequest, "Reject/{id}");
    }

    public async Task<IResult> GetRepairRequests(
        ISender sender,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] int? facilityId = null,
        [FromQuery] int? levelId = null,
        [FromQuery] int? areaId = null,
        [FromQuery] int? resourceAssetTypeId = null,
        [FromQuery] int? resourceAssetId = null,
        [FromQuery] string? search = null
    )
    {
        var result = await sender.Send(new GetRepairRequestsQuery(pageNumber, pageSize, startDate, endDate, facilityId,
            levelId, areaId, resourceAssetTypeId, resourceAssetId, search));

        return Results.Ok(result);
    }

    public async Task<IResult> GetRepairRequest(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetRepairRequestDetailsQuery(id));

        return Results.Ok(result);
    }

    public async Task<int> CreateRepairRequest(ISender sender, [FromBody] CreateRepairRequestCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateRepairRequest(ISender sender, [FromRoute] int id,
        [FromBody] UpdateRepairRequestCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteRepairRequest(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteRepairRequestCommand(id));
        return Results.NoContent();
    }

    public async Task<IResult> ApproveRepairRequest(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new ApproveRepairRequestCommand(id));
        return Results.NoContent();
    }

    public async Task<IResult> RejectRepairRequest(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new RejectRepairRequestCommand(id));
        return Results.NoContent();
    }
}
