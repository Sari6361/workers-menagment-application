using Microsoft.EntityFrameworkCore;
using Worker.Core.Entities;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _context;
        public WorkerRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetWorkersAsync(bool? status, int menagerId)
        {
            return await _context.Workers.Where(w =>w.MenagerId == menagerId &&( w.Status == status || status == null)).Include(w => w.Roles).ToListAsync();
        }

        public async Task<Employee> GetWorkerByIdAsync(int id)
        {
            var workers = _context.Workers.Include(w => w.Roles).ToList();
            return workers?.Find(w=>w.Id ==id);
        }

        public async Task<Employee> AddWorkerAsync(Employee worker)
        {
            _context.ChangeTracker.QueryTrackingBehavior =QueryTrackingBehavior.NoTracking;
            await _context.Workers.AddAsync(worker);
            await _context.SaveChangesAsync();
            return worker;
        }

        public async Task<Employee> UpdateWorkerAsync(int id, Employee worker)
        {
            Employee? e = await _context.Workers.FindAsync(id);
            if (e is not null)
            {
                e.FirstName = worker.FirstName;
                e.LastName = worker.LastName;
                e.Roles = worker.Roles;
                e.Status = worker.Status;
                e.StartDate = worker.StartDate;
                e.Email = worker.Email;
                e.Address = worker.Address;
                await _context.SaveChangesAsync();
                return e;
            }
            return null;
        }

        public async Task<Employee> UpdateWorkerStatusAsync(int id, bool status)
        {
            Employee? e = await _context.Workers.FindAsync(id);
            if (e is not null)
                e.Status = status;
            await _context.SaveChangesAsync();
            return e;
        }
    }
}
