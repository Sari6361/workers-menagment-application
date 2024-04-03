using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Worker.Core.Entities;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class MenagerRepository : IMenagerRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MenagerRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<Menager> GetMenagers() => _context.Menagers.Include(u => u.Workers).ToList();

        public async Task<Menager> GetMenagerByIdAsync(int id)
        {
            var menagers = _context.Menagers.Include(u => u.Workers);
            var m = await menagers.Include(w => w.Workers).ThenInclude(w => w.Roles).FirstAsync(u => u.Id == id);
            return m;
        }
        public async Task<Menager> GetMenagerByNameAndPasswordAsync(string name, string password)
        {
            var menagers = await _context.Menagers.Include(w => w.Workers).ThenInclude(w => w.Roles).ToListAsync();
            return menagers.Find(m => m.UserName.Equals(name) && m.Password.Equals(password));
        }

        public async Task<Menager> AddMenagerAsync(Menager m)
        {
            await _context.Menagers.AddAsync(m);
            await _context.SaveChangesAsync();
            return m;
        }

        public async Task<Menager>? UpdateMenagerAsync(int id, Menager m)
        {
            Menager? menager = await _context.Menagers.FindAsync(id);

            if (menager is not null)
            {
                menager.FirstName = m.FirstName;
                menager.LastName = m.LastName;
                menager.Password = m.Password;
                menager.UserName = m.UserName;
                menager.Email = m.Email;
                menager.Workers?.Clear();
                await _context.SaveChangesAsync();
                m.Workers?.ForEach(w =>
                {
                    w.Id = 0;
                    w.Roles.ForEach(r => r.Id = 0);
                    menager.Workers?.Add(w);
                });
                _context.Menagers.Update(menager);
                await _context.SaveChangesAsync();
                return menager;
            }
            return null;
        }

        //public async Task<Menager>? AddWorkerToMenagerAsync(int menagerId, Employee e)
        //{
        //    Menager? menager = await _context.Menagers?.Include(w => w.Workers)?.ThenInclude(w => w.Roles).FirstAsync(m => m.Id == menagerId);
        //    menager?.Workers?.Add(e);
        //    _context.Menagers.Update(menager);
        //    await _context.SaveChangesAsync();
        //    return menager;
        //}
        //public async Task<Menager>? UpdateWorkerAsync(int menagerId, int id, Employee e)
        //{
        //    Menager? menager = await _context.Menagers?.Include(w => w.Workers)?.ThenInclude(w => w.Roles).FirstAsync(m=>m.Id==menagerId);
        //    if (menager is null)
        //        return null;
        //    var employee = menager?.Workers?.Find(w => w.Id == id);
        //    if (employee is null)
        //        return null;
        //    _mapper.Map<Employee, Employee>(e, employee);
        //    _context.Workers.Update(employee);
        //    await _context.SaveChangesAsync();
        //    return menager;
        //}
        //public async Task<Menager>? UpdateWorkerStatusAsync(int menagerId, int id, bool status)
        //{
        //    Menager? menager = await _context.Menagers?.Include(w => w.Workers)?.ThenInclude(w => w.Roles).FirstAsync(m => m.Id == menagerId);
        //    if (menager is null)
        //        return null;
        //    var employee = menager.Workers.FindLast(w => w.Id == id).Status = status;
        //    _context.Menagers.Update(menager);
        //    await _context.SaveChangesAsync();
        //    return menager;
        //}

    }
}
