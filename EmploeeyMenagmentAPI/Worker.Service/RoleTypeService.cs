using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;
using Worker.Core.Repositories;
using Worker.Core.Services;

namespace Worker.Service
{
    public class RoleTypeService:IRoleTypeService
    {
        private readonly IRoleTypeRepository _repository;
        public RoleTypeService(IRoleTypeRepository repository)
        {
            _repository = repository;
        }
        public Task<IEnumerable<RoleType>> GetRoles() => _repository.GetRoles();
        public async Task<RoleType> GetRolesByIdAsync(int id)
        {
            return await _repository.GetRolesByIdAsync(id);
        }
    }
}
