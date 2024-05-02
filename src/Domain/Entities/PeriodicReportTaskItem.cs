namespace MMC.Domain.Entities;

public class PeriodicReportTaskItem
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public bool IsCompleted { get; set; }
    
    public int PeriodicReportTaskId { get; set; }
    public PeriodicReportTask PeriodicReportTask { get; set; } = null!;
    
    public ICollection<PeriodicReportTaskItemAttachment> Attachments { get; set; } = new List<PeriodicReportTaskItemAttachment>();
}
