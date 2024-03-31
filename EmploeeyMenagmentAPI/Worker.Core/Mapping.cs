using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.DTOs;
using Worker.Core.Entities;

namespace Worker.Core
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Menager, MenagerDto>().ReverseMap();  
        }
    }
}
