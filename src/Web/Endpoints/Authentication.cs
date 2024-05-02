using MMC.Infrastructure.Identity;

namespace MMC.Web.Endpoints;

public class Authentication : EndpointGroupBase
{
    // app.MapPost("/api/v1/Users/create", async (IIdentityService identityService, [FromBody] CreateUserCommand cmd) =>
    // {
    //     var users = await identityService.CreateUserAsync(cmd);
    //
    //     return Results.Ok(users);
    // });

    public override void Map(WebApplication app)
    {
        // app.MapPost("/api/v1/Users/create", async (IIdentityService identityService, [FromBody] CreateUserCommand cmd) =>
        // {
        //     var users = await identityService.CreateUserAsync(cmd);
        //
        //     return Results.Ok(users);
        // });
        app.MapGroup(this)
            .MapIdentityApi<ApplicationUser>();
    }

}
