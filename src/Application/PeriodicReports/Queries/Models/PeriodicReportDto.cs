using MMC.Domain.Entities;

namespace MMC.Application.PeriodicReports.Queries.Models;

public class PeriodicReportDto
{
    
    
    
    private class  Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<PeriodicReport, PeriodicReportDto>();
        }
    }
}
