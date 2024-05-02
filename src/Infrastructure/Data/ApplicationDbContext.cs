using System.Net.Mail;
using System.Reflection;
using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace MMC.Infrastructure.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser>(options), IApplicationDbContext
{
    public DbSet<Area> Areas => Set<Area>();

    public DbSet<Facility> Facilities => Set<Facility>();

    public DbSet<Level> Levels => Set<Level>();

    public DbSet<PeriodicReport> PeriodicReports => Set<PeriodicReport>();

    public DbSet<PeriodicReportTask> PeriodicReportTasks => Set<PeriodicReportTask>();

    public DbSet<PeriodicReportTaskItem> PeriodicReportTaskItems => Set<PeriodicReportTaskItem>();

    public DbSet<PeriodicReportTaskItemAttachment> PeriodicReportTaskItemAttachments =>
        Set<PeriodicReportTaskItemAttachment>();

    public DbSet<RepairRequest> RepairRequests => Set<RepairRequest>();

    public DbSet<ResourceAsset> ResourceAssets => Set<ResourceAsset>();

    public DbSet<ResourceAssetAttachment> ResourceAssetsAttachments => Set<ResourceAssetAttachment>();

    public DbSet<ResourceAssetType> ResourceAssetTypes => Set<ResourceAssetType>();

    public DbSet<TechnicalReport> TechnicalReports => Set<TechnicalReport>();

    public DbSet<TechnicalReportsAttachment> TechnicalReportsAttachments => Set<TechnicalReportsAttachment>();

    public DbSet<UploadedFile> UploadedFiles => Set<UploadedFile>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
