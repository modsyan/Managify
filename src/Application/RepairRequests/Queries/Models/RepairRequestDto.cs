using MMC.Application.ResourceAssets.Queries.Models;
using MMC.Domain.Entities;
using MMC.Domain.Enums;

namespace MMC.Application.RepairRequests.Queries.Models;

public class RepairRequestDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string FaultDescription { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string Contractor { get; set; } = string.Empty;

    public string? ContractorNote { get; set; }

    public string? Manager { get; set; }

    public string? MangerNote { get; set; }

    public string? Supervisor { get; set; }

    public string? SupervisorNote { get; set; }

    public string? Technician { get; set; }

    public string? TechnicianNote { get; set; }

    public ResourceAssetDto ResourceAsset { get; set; } = null!;

    public string Priority { get; set; } = string.Empty;
    
    public string Status { get; set; } = string.Empty;
    
    private class RepairRequestDtoProfile : Profile
    {
        public RepairRequestDtoProfile()
        {
            CreateMap<RepairRequest, RepairRequestDto>()
                .ForMember(d => d.Contractor, opt => opt.MapFrom(s => s.ContractorId))
                .ForMember(d => d.Manager, opt => opt.MapFrom(s => s.ManagerId))
                .ForMember(d => d.Supervisor, opt => opt.MapFrom(s => s.SupervisorId))
                .ForMember(d => d.Technician, opt => opt.MapFrom(s => s.TechnicianId))
                .ForMember(d => d.Priority, opt => opt.MapFrom(s => Enum.GetName(typeof(RepairRequestPriority), s.Priority!)))
                .ForMember(d => d.Status, opt => opt.MapFrom(s => Enum.GetName(typeof(RepairRequestStatus), s.Status)));
        }
    }
}
