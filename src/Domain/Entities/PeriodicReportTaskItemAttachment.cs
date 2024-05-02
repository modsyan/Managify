namespace MMC.Domain.Entities;

public class PeriodicReportTaskItemAttachment
{
    public int PeriodicReportTaskItemId { get; set; }
    public PeriodicReportTaskItem PeriodicReportTaskItem { get; set; } = null!;
    
    public Guid UploadedFileId { get; set; }
    public UploadedFile UploadedFile { get; set; } = null!;
}
