namespace MMC.Domain.Entities;

public class PeriodicReport: BaseAuditableEntity
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    
    public PeriodicReportType Type { get; set; }
    
    public int FacilityId { get; set; }
    public Facility Facility { get; set; } = null!;
    
    public ICollection<PeriodicReportTask> Items { get; set; } = new List<PeriodicReportTask>();
}

