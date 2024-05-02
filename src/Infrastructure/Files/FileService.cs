using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MMC.Application.Common.Interfaces;
using MMC.Domain.Entities;
using MMC.Infrastructure.Configuration;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

namespace MMC.Infrastructure.Files;

public class FileService(
    IWebHostEnvironment webHostEnvironment,
    IOptions<FileOption> fileOptions,
    IApplicationDbContext dbContext)
    : IFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;
    private readonly IOptions<FileOption> _fileOptions = fileOptions;
    private readonly IApplicationDbContext _dbContext = dbContext;

    public async Task<UploadedFile> SaveFileAsync(byte[] file, params string[] tags)
    {
        // // var uploadsFolder = GetUploadsFolder();
        //
        // var fileId = Guid.NewGuid();
        // var originalExtension = "bin"; // Default extension if the original one is not available
        //
        // if (file.Length > (_fileOptions.Value.MaxFileSizeInMb * 1024 * 1024))
        // {
        //     throw new Exception("File size exceeds the maximum allowed.");
        // }
        //
        // if (file.Length >= 4) // Ensure at least 4 bytes for detecting the file extension
        // {
        //     originalExtension = GetFileExtension(file);
        // }
        //
        // var genFileName = $"{fileId}.{originalExtension}";
        //
        // var filePath = Path.Combine(uploadsFolder, genFileName);
        //
        // var uploadedFile = new UploadedFile
        // {
        //     Id = fileId,
        //     FileName = genFileName,
        //     OriginalFileName = $"file.{originalExtension}",
        //     FilePath = filePath,
        //     ContentType = "application/octet-stream", // Change this based on your file type
        //     FileSize = file.Length,
        //     Tags = tags.ToList(),
        // };
        //
        // await File.WriteAllBytesAsync(filePath, file);
        //
        // // Save the UploadedFile to the database
        // // _dbContext.UploadedFiles.Add(uploadedFile);
        // // await _dbContext.SaveChangesAsync();
        //
        // return uploadedFile;
        throw new NotImplementedException();
    }

    private string GetFileExtension(byte[] file)
    {
        // Use the first four bytes of the file to determine the file extension
        var fileSignature = BitConverter.ToUInt32(file.Take(4).ToArray(), 0);

        // if (FileSignatureMappings.TryGetValue(fileSignature, out var extension))
        // {
        //     return extension;
        // }
        //
        return "bin"; // Default extension if the file signature is not recognized
    }
}
