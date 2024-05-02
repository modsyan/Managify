using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class ResourceAssetConfiguration : IEntityTypeConfiguration<ResourceAsset>
{
    public void Configure(EntityTypeBuilder<ResourceAsset> builder)
    {
        builder.ToTable("ResourceAssets", "dbo").HasKey(x => x.Id);
    }
}
