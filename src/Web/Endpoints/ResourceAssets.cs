using Microsoft.AspNetCore.Mvc;
using MMC.Application.ResourceAssets.Commands;
using MMC.Application.ResourceAssets.Queries;

namespace MMC.Web.Endpoints;

public class ResourceAssets : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetResourceAssets)
            .MapGet(GetResourceAsset, "details/{id}")
            .MapPost(CreateResourceAsset)
            .MapPut(UpdateResourceAsset, "{id}")
            .MapDelete(DeleteResourceAsset, "{id}");
    }

    public async Task<IResult> GetResourceAssets(
        ISender sender,
        [FromQuery] int? resourceAssetTypeId,
        [FromQuery] int? pageNumber,
        [FromQuery] int? pageSize,
        [FromQuery] int? levelId,
        [FromQuery] int? facilityId,
        [FromQuery] int? areaId
    )
    {
        if (resourceAssetTypeId == null || levelId == null || facilityId == null || areaId == null)
            return Results.BadRequest(
                "Must Provide One of the Following: ResourceAssetTypeId, LevelId, FacilityId, AreaId");

        var result = await sender.Send(new GetResourceAssetsQuery(
            resourceAssetTypeId, pageNumber, pageSize, levelId, facilityId, areaId));

        return Results.Ok(result);
    }

    public async Task<IResult> GetResourceAsset(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetResourceAssetDetailsQuery(id));

        return Results.Ok(result);
    }

    public async Task<int> CreateResourceAsset(ISender sender, [FromBody] CreateResourceAssetCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateResourceAsset(ISender sender, [FromRoute] int id,
        [FromBody] UpdateResourceAssetCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteResourceAsset(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteResourceAssetCommand(id));
        return Results.NoContent();
    }
}
