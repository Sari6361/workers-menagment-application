using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Worker.Core.Entities
{
    public class Menager
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Identity { get; set; }
        public string? Password { get; set; }
        public string? UserName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Kind kind { get; set; }
        public string? Email { get; set; }
        public List<Employee>? Workers { get; set; }
    }
}
