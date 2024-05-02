namespace MMC.Domain.Entities;

public class TechnicalReportsAttachment
{
    public int TechnicalReportId { get; set; }
    public TechnicalReport TechnicalReport { get; set; } = null!;
    
    public Guid UploadedFileId { get; set; }
    public UploadedFile UploadedFile { get; set; } = null!;
}
