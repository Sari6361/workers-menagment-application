using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string? Identity { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public List<Role>? Roles { get; set; }
        public bool Status { get; set; }
        public Kind kind { get; set; }

    }
}
