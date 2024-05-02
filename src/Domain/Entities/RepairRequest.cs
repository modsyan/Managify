namespace MMC.Domain.Entities;

public class RepairRequest : BaseAuditableEntity
{
    public string Title { get; set; } = null!; 
    
    public string FaultDescription { get; set; } = null!;
    
    public string Author { get; set; } = null!;
    
    public string? ContractorId { get; set; }
    public string? ContractorNote { get; set; }
    
    public string? ManagerId { get; set; }
    public string? MangerNote { get; set; }
    
    public string? SupervisorId { get; set; }
    public string? SupervisorNote { get; set; }
    
    public string? TechnicianId { get; set; }
    public string? TechnicianNote { get; set; }
    
    public RepairRequestStatus Status { get; set; }
    
    public RepairRequestPriority? Priority { get; set; }
    
    public int ResourceAssetId { get; set; }
    
    public ResourceAsset ResourceAsset { get; set; } = null!;
}
