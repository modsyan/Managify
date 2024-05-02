using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class PeriodicReportConfiguration : IEntityTypeConfiguration<PeriodicReport>
{
    public void Configure(EntityTypeBuilder<PeriodicReport> builder)
    {
        builder.ToTable("PeriodicReports", "dbo").HasKey(x => x.Id);
    }
}

