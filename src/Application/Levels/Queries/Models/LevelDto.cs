using MMC.Application.Areas.Queries.Models;
using MMC.Application.Facilities.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Levels.Queries.Models;

public class LevelDto
{
    
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public FacilityDto Facility { get; set; } = null!;
    
    public List<AreaDto> Areas { get; set; } = [];
    
    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Level, LevelDto>();
        }
    }
}
