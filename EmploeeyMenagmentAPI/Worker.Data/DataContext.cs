using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Worker.Core.Entities;

namespace Worker.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Menager> Menagers { get; set; }

        public DbSet<Employee> Workers { get; set; }
      //  public DbSet<Role> Roles { get; set; }

        public DbSet<RoleType> RolesType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=workers");
            optionsBuilder.LogTo((message) => Debug.WriteLine(message));
        }
    }
}
