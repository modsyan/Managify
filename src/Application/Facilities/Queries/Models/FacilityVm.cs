namespace MMC.Application.Facilities.Queries.Models;

public class FacilityVm
{
    public List<FacilityDto> List { get; set; } = new List<FacilityDto>();
    public int Count { get; set; }
}
