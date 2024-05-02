namespace MMC.Domain.Entities;

public class Facility: BaseAuditableEntity
{
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string? Description { get; set; }
    
    public ICollection<Level> Levels { get; set; } = new List<Level>();
}
