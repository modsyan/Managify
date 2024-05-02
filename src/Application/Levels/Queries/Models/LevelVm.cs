namespace MMC.Application.Levels.Queries.Models;

public class LevelVm
{
    public List<LevelDto> List { get; set; } = new List<LevelDto>();
    public int Count { get; set; }
}
