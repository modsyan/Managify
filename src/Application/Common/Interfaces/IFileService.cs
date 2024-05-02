using MMC.Domain.Entities;

namespace MMC.Application.Common.Interfaces;

public interface IFileService
{
    Task<UploadedFile> SaveFileAsync(byte[] file, params string[] tags);
}
