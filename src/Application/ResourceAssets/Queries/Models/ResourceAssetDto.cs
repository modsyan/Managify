using MMC.Application.Areas.Queries.Models;
using MMC.Application.ResourceAssetTypes.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.ResourceAssets.Queries.Models;

public class ResourceAssetDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public AreaDto Area { get; set; } = null!;

    public List<string> Attachments { get; set; } = new List<string>();

    public List<ResourceAssetTypeDto> Tags { get; set; } = new List<ResourceAssetTypeDto>();

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ResourceAsset, ResourceAssetDto>()
                .ForMember(d => d.Attachments,
                    opt => opt.MapFrom(s => s.Attachments.Select(a => a.UploadedFile.FilePath)));
        }
    }
}
