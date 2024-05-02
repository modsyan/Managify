using MMC.Application.ResourceAssets.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssetTypes.Queries.Models;

public class ResourceAssetTypeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Icon { get; set; }
    
    public List<ResourceAssetDto> ResourceAssets { get; set; } = new List<ResourceAssetDto>();
    
    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ResourceAssetType, ResourceAssetTypeDto>();
        }
    }
}
