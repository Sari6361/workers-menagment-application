using Worker.Core.Entities;

namespace Worker.API.Models
{
    public class EmployeePutModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public List<Role> Roles { get; set; }
        public bool Status { get; set; }
        public int Id { get; set; }
        public string Identity { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
} 
