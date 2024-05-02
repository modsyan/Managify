using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class TechnicalReportConfiguration: IEntityTypeConfiguration<TechnicalReport>
{
    public void Configure(EntityTypeBuilder<TechnicalReport> builder)
    {
        builder.ToTable("TechnicalReports", "dbo").HasKey(x => x.Id);
    }
}
