using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class PeriodicReportTaskItemAttachmentConfiguration: IEntityTypeConfiguration<PeriodicReportTaskItemAttachment>
{
    public void Configure(EntityTypeBuilder<PeriodicReportTaskItemAttachment> builder)
    {
        builder
            .ToTable("PeriodicReportTaskItemAttachments", "dbo")
            .HasKey(pr => new { pr.UploadedFileId, pr.PeriodicReportTaskItemId });
        
        builder
            .HasOne(e => e.PeriodicReportTaskItem)
            .WithMany(s => s.Attachments)
            .HasForeignKey(e => e.PeriodicReportTaskItemId)
            ;
        
        builder
            .HasOne(e => e.UploadedFile)
            .WithMany()
            .HasForeignKey(e => e.UploadedFileId);

    }
}
