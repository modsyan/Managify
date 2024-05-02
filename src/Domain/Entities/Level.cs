namespace MMC.Domain.Entities;

public class Level: BaseAuditableEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    
    public int FacilityId { get; set; }
    public Facility Facility { get; set; } = null!;
    
    public ICollection<Area> Areas { get; set; } = new List<Area>();
}
