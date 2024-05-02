namespace MMC.Domain.Entities;

public class ResourceAsset: BaseAuditableEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    
    public int AreaId { get; set; }
    public Area Area { get; set; } = null!;
    
    public ICollection<ResourceAssetAttachment> Attachments { get; set; } = new List<ResourceAssetAttachment>();
    
    public ICollection<ResourceAssetType> Tags { get; set; } = new List<ResourceAssetType>();
    public ICollection<RepairRequest> RepairRequests { get; set; } = new List<RepairRequest>();
}

