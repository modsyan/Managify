using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MMC.Domain.Entities;

namespace MMC.Infrastructure.Data.Configurations;

public class ResourceAssetTypeConfiguration : IEntityTypeConfiguration<ResourceAssetType>
{
    public void Configure(EntityTypeBuilder<ResourceAssetType> builder)
    {
        builder.ToTable("ResourceAssetTypes", "dbo").HasKey(x => x.Id);
    }
}
