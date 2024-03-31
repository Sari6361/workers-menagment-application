using AutoMapper;
using Worker.API.Models;
using Worker.Core.Entities;

namespace Worker.API
{
    public class MappingAPI:Profile
    {
        public MappingAPI()
        {
            CreateMap<Employee, EmployeePutModel>().ReverseMap();
            CreateMap<Menager, MenagerPostModel>().ReverseMap();
            CreateMap<Menager, MenagerPutModel>().ReverseMap();
            CreateMap<Menager, LoginModel>().ReverseMap();
        }
    }
}
