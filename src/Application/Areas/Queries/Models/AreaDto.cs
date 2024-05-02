using MMC.Application.Levels.Queries.Models;
using MMC.Application.ResourceAssets.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.Areas.Queries.Models;

public class AreaDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public LevelDto Level { get; set; } = new LevelDto();
    
    public List<ResourceAssetDto> Assets { get; set; } = new List<ResourceAssetDto>();
    
    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Area, AreaDto>();
        }
    }
}
