using MMC.Application.Common.Interfaces;
using MMC.Application.Common.Mappings;
using MMC.Application.Common.Models;
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Application.TodoItems.Queries.GetTodoItemsWithPagination;

public record GetTodoItemsWithPaginationQuery : IRequest<PaginatedList<TodoItemBriefDto>>
{
    public int ListId { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetTodoItemsWithPaginationQueryHandler : IRequestHandler<GetTodoItemsWithPaginationQuery, PaginatedList<TodoItemBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTodoItemsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<TodoItemBriefDto>> Handle(GetTodoItemsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        // return await _context.TodoItems
        //     .Where(x => x.ListId == request.ListId)
        //     .OrderBy(x => x.Title)
        //     .ProjectTo<TodoItemBriefDto>(_mapper.ConfigurationProvider)
        //     .PaginatedListAsync(request.PageNumber, request.PageSize);
        throw new NotImplementedException();
    }
}
