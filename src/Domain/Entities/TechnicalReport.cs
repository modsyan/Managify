namespace MMC.Domain.Entities;

public class TechnicalReport: BaseAuditableEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string TechnicianName { get; set; } = null!;
    
    public int ResourceAssetId { get; set; }
    public ResourceAsset ResourceAsset { get; set; } = null!;
    
    public ICollection<TechnicalReportsAttachment> Attachments { get; set; } = new List<TechnicalReportsAttachment>();
}
