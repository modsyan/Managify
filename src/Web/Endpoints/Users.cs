namespace MMC.Web.Endpoints;

public class Users: EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        /*
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetUsers)
            .MapGet(GetUser, "{id}")
            .MapPost(CreateUser)
            .MapPut(UpdateUser, "{id}")
            .MapDelete(DeleteUser, "{id}");
    */
    }
    
    /*
    public async Task<IResult> GetUsers(ISender sender)
    {
        var result = await sender.Send(new GetUsersQuery());
        
        return Results.Ok(result);
    }
    
    public async Task<IResult> GetUser(ISender sender, int id)
    {
        var result =  await sender.Send(new GetUserDetailsQuery(id));
        
        return Results.Ok(result);
    }
    
    public async Task<int> CreateUser(ISender sender, CreateUserCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<IResult> UpdateUser(ISender sender, int id, UpdateUserCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }
    
    public async Task<IResult> DeleteUser(ISender sender, int id)
    {
        await sender.Send(new DeleteUserCommand(id));
        return Results.NoContent();
    }
    */
    
    
}
