using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class RoleTypeRepository : IRoleTypeRepository
    {
        private readonly DataContext _context;

        public RoleTypeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleType>> GetRoles() => await _context.RolesType.ToListAsync();
        public async Task<RoleType> GetRolesByIdAsync(int id)
        {
            return await _context.RolesType.FindAsync(id);
        }

    }
}
