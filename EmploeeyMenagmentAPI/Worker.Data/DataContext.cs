using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Worker.Core.Entities;

namespace Worker.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Menager> Menagers { get; set; }

        public DbSet<Core.Entities.Employee> Workers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=workers");
            optionsBuilder.LogTo((message) => Debug.WriteLine(message));
        }
    }
}
