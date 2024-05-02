using System.Net.Mail;
using MMC.Domain.Entities;

namespace MMC.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    public DbSet<Area> Areas { get; }
    public DbSet<Facility> Facilities { get; }
    
    public DbSet<Level> Levels { get; }
    
    public DbSet<PeriodicReport> PeriodicReports { get; }
    
    public DbSet<PeriodicReportTask> PeriodicReportTasks { get; }
    
    public DbSet<PeriodicReportTaskItem> PeriodicReportTaskItems { get; }
    
    public DbSet<PeriodicReportTaskItemAttachment> PeriodicReportTaskItemAttachments { get; }
    
    public DbSet<RepairRequest> RepairRequests { get; }
    
    public DbSet<ResourceAsset> ResourceAssets { get; }
    
    public DbSet<ResourceAssetAttachment> ResourceAssetsAttachments { get; }
    
    public DbSet<ResourceAssetType> ResourceAssetTypes { get; }
    
    public DbSet<TechnicalReport> TechnicalReports { get; }
    
    public DbSet<TechnicalReportsAttachment> TechnicalReportsAttachments { get; }
    
    public DbSet<UploadedFile> UploadedFiles { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
