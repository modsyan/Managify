namespace MMC.Domain.Entities;

public class ResourceAssetType: BaseAuditableEntity
{
   public string Name { get; set; } = null!; 
   public string Description { get; set; } = null!;
   public string? Icon { get; set; }
   
    public ICollection<ResourceAsset> ResourceAssets { get; set; } = null!;
}
