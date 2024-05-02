namespace MMC.Domain.Entities;

public class PeriodicReportTask
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    
    public PeriodicReportTimeFrame Type { get; set; }
    
    public int PeriodicReportId { get; set; }
    public PeriodicReport PeriodicReport { get; set; } = null!;
    
    public ICollection<PeriodicReportTaskItem> Items { get; set; } = new List<PeriodicReportTaskItem>();
}
