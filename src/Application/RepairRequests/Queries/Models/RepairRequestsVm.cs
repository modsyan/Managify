namespace MMC.Application.RepairRequests.Queries.Models;

public class RepairRequestsVm
{
    public List<RepairRequestDto> RepairRequests { get; set; } = new();
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalItems { get; set; }
}
