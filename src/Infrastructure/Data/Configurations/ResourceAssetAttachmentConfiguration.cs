using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class ResourceAssetAttachmentConfiguration: IEntityTypeConfiguration<ResourceAssetAttachment>
{
    public void Configure(EntityTypeBuilder<ResourceAssetAttachment> builder)
    {
        
        builder
            .ToTable("ResourceAssetAttachments", "dbo")
            .HasKey(pr => new { pr.UploadedFileId, pr.ResourceAssetId });
        
        builder
            .HasOne(e => e.ResourceAsset)
            .WithMany(s => s.Attachments)
            .HasForeignKey(e => e.ResourceAssetId);
        
        builder
            .HasOne(e => e.UploadedFile)
            .WithMany()
            .HasForeignKey(e => e.UploadedFileId);
    }
}
