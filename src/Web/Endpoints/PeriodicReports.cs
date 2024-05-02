using Microsoft.AspNetCore.Mvc;
using MMC.Application.PeriodicReports.Commands;
using MMC.Application.PeriodicReports.Queries;

namespace MMC.Web.Endpoints;

public class PeriodicReports : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetPeriodicReports)
            .MapGet(GetPeriodicReport, "details/{id}")
            .MapPost(CreatePeriodicReport)
            .MapPut(UpdatePeriodicReport, "{id}")
            .MapDelete(DeletePeriodicReport, "{id}");
    }

    public async Task<IResult> GetPeriodicReports(ISender sender)
    {
        var result = await sender.Send(new GetPeriodicReportsQuery());

        return Results.Ok(result);
    }

    public async Task<IResult> GetPeriodicReport(ISender sender, [FromRoute] int id)
    {
        var result = await sender.Send(new GetPeriodicReportDetailsQuery(id));

        return Results.Ok(result);
    }

    public async Task<int> CreatePeriodicReport(ISender sender, [FromBody] CreatePeriodicReportCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> UpdatePeriodicReport(ISender sender, [FromRoute] int id,
        [FromBody] UpdatePeriodicReportCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeletePeriodicReport(ISender sender, [FromRoute] int id)
    {
        await sender.Send(new DeletePeriodicReportCommand(id));
        return Results.NoContent();
    }
}
