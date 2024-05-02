using Microsoft.AspNetCore.Mvc;
using MMC.Application.TechnicalReports.Commands;
using MMC.Application.TechnicalReports.Queries;

namespace MMC.Web.Endpoints;

public class TechnicalReports : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetTechnicalReports)
            .MapGet(GetTechnicalReport, "details/{id}")
            .MapPost(CreateTechnicalReport)
            .MapPut(UpdateTechnicalReport, "{id}")
            .MapDelete(DeleteTechnicalReport, "{id}");
    }

    public async Task<IResult> GetTechnicalReports(
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
        var result = await sender.Send(new GetTechnicalReportsQuery(pageNumber, pageSize, startDate, endDate,
            facilityId, levelId, areaId, resourceAssetTypeId, resourceAssetId, search));

        return Results.Ok(result);
    }

    public async Task<IResult> GetTechnicalReport(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetTechnicalReportDetailsQuery(id));

        return Results.Ok(result);
    }

    public async Task<int> CreateTechnicalReport(ISender sender, [FromBody] CreateTechnicalReportCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdateTechnicalReport(ISender sender, [FromRoute] int id,
        [FromBody] UpdateTechnicalReportCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteTechnicalReport(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeleteTechnicalReportCommand(id));
        return Results.NoContent();
    }
}
