namespace MMC.Application.Areas.Queries.Models;

public class AreaVm
{
    public List<AreaDto> List { get; set; } = new List<AreaDto>(); 
    
    public int Count { get; set; }
}
