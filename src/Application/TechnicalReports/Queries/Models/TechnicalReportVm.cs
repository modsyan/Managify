namespace MMC.Application.TechnicalReports.Queries.Models;

public class TechnicalReportVm
{
    public List<TechnicalReportDto> TechnicalReports { get; set; } = new List<TechnicalReportDto>();
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalItems { get; set; }
}
