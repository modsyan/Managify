using System.Net.Mail;
using MMC.Application.ResourceAssets.Queries.Models;
using MMC.Domain.Entities;

namespace MMC.Application.TechnicalReports.Queries.Models;

public class TechnicalReportDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string TechnicianName { get; set; } = null!;

    public ResourceAssetDto ResourceAsset { get; set; } = null!;

    public List<string> Attachments { get; set; } = [];

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TechnicalReport, TechnicalReportDto>()
                .ForMember(d => d.Attachments,
                    opt => opt.MapFrom(s => s.Attachments.Select(a => a.UploadedFile.FilePath).ToList()));
        }
    }
}
