using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Worker.Core.Entities
{
    public enum Kind { Male=1, Female=2}
    public class Employee
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Identity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateOfBirth { get; set;}
        public Kind kind { get; set; }
        public List<Role> Roles { get; set; }
        public bool Status { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }

    }
}
