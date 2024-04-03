using Microsoft.AspNetCore.Mvc;
using Worker.Core.Entities;
using Worker.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleTypeController : ControllerBase
    {
        private readonly IRoleTypeService _roleTypeService;

        public RoleTypeController(IRoleTypeService roleTypeService)
        {
            _roleTypeService = roleTypeService;
        }
        // GET: api/<RoleControllerr>
        [HttpGet]
        public async Task<IEnumerable<RoleType>> Get()
        {
            return await _roleTypeService.GetRoles();
        }

        // GET api/<RoleControllerr>/5
        [HttpGet("{id}")]
        public async Task<RoleType> Get(int id)
        {
            return await _roleTypeService.GetRolesByIdAsync(id);
        }

    }
}
