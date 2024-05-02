namespace MMC.Domain.Entities;

public class Area : BaseAuditableEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    
    public int LevelId { get; set; }
    public Level Level { get; set; } = null!;
    
    public ICollection<ResourceAsset> Assets { get; set; } = new List<ResourceAsset>();
}
