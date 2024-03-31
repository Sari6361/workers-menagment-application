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

        public List<Menager> GetMenagers() => _context.Menagers.ToList();

        public async Task<Menager> GetMenagerByIdAsync(int id)
        {
            return await _context.Menagers.FindAsync(id);
        }
        public async Task<Menager> GetMenagerByNameAndPasswordAsync(string name, string password)
        {
            var menagers = await _context.Menagers.ToListAsync();
            var menager = menagers.Find(m => m.UserName.Equals(name) && m.Password.Equals(password));
            return menager;
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
                menager.Workers = m.Workers;

                await _context.SaveChangesAsync();
                return menager;
            }
            return null;
        }

    }
}
