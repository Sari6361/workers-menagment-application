using Worker.Core.Entities;

namespace Worker.API.Models
{
    public class MenagerPutModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<Employee> Workers { get; set; }
    }
}
