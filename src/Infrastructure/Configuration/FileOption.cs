namespace MMC.Infrastructure.Configuration;

public class FileOption
{
    public string FileHostUrl { get; set; } = string.Empty;
    
    public string AllowedImageExtensions { get; set; } = string.Empty;
    
    public int MaxFileSizeInMb { get; set; }
}
