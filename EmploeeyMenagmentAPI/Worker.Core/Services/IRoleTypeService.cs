using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.Services
{
    public interface IRoleTypeService
    {
        Task<IEnumerable<RoleType>> GetRoles();
        Task<RoleType> GetRolesByIdAsync(int id);
    }
}
