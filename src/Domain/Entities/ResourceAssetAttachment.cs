namespace MMC.Domain.Entities;

public class ResourceAssetAttachment
{
    public int ResourceAssetId { get; set; }
    public ResourceAsset ResourceAsset { get; set; } = null!;
    
    public Guid UploadedFileId { get; set; }
    public UploadedFile UploadedFile { get; set; } = null!;
}
