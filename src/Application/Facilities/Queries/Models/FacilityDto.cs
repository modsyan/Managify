using MMC.Application.Levels.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Facilities.Queries.Models;

public class FacilityDto
{
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public string? Address { get; set; }
    
    public List<LevelDto> Levels { get; set; } = [];
    
    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Facility, FacilityDto>();
        }
    }
}
