using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class TechnicalReportAttachmentConfiguration : IEntityTypeConfiguration<TechnicalReportsAttachment>
{
    public void Configure(EntityTypeBuilder<TechnicalReportsAttachment> builder)
    {
        builder.ToTable("TechnicalReportsAttachments", "dbo")
            .HasKey(x => new { x.TechnicalReportId, x.UploadedFileId });
        
        builder.HasOne(x => x.TechnicalReport)
            .WithMany(x => x.Attachments)
            .HasForeignKey(x => x.TechnicalReportId);
        
        builder.HasOne(x => x.UploadedFile)
            .WithMany()
            .HasForeignKey(x => x.UploadedFileId);
    }
}
