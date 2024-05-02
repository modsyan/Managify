namespace MMC.Domain.Entities;

public class UploadedFile: BaseAuditableEntity
{
    public new Guid Id { get; set; }
    
    public string FilePath { get; set; } = null!;
    public string FileName { get; set; } = null!;
    public string OriginalFileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = null!;
    public long FileSize { get; set; }
    public string? Description { get; set; }
    public ICollection<string> Tags { get; set; } = new List<string>();
    
    public int? TechnicalReportId { get; set; }
    public TechnicalReport? TechnicalReport { get; set; }
    
    public int? RepairRequestId { get; set; }
    public RepairRequest? RepairRequest { get; set; }
}
