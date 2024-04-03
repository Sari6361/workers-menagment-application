using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Worker.API.Models;
using Worker.Core.DTOs;
using Worker.Core.Entities;
using Worker.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IWorkerService _service;
        private readonly IMapper _mapper;

        public EmployeeController(IWorkerService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/<WorkerController>
        [HttpGet("{menagerId}/{status}")]
        public async Task<IEnumerable<EmployeeDto>> Get(bool? status, int menagerId)
        {
            var workers = await _service.GetWorkersAsync(status, menagerId);
            return _mapper.Map<IEnumerable<EmployeeDto>>(workers);
        }

        // GET api/<WorkerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> Get(int id)
        {
            var e = await _service?.GetWorkerByIdAsync(id);
            if (e is null)
                return NotFound();
            var eDto = _mapper.Map<EmployeeDto>(e);
            return Ok(eDto);
        }

        // POST api/<WorkerController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee e)
        {
            var workers = await _service.GetWorkersAsync(true, e.MenagerId);
            var exit= workers?.FirstOrDefault(c => (c.Identity is null || c.Identity.Equals(e.Identity)));
            if (exit is not null)
                return Unauthorized(new { Error = "Exit" });

            var addedEmployee = await _service.AddWorkerAsync(e);
            if (addedEmployee is null)
                return BadRequest();
            var employeeDto = _mapper.Map<EmployeeDto>(addedEmployee);
            return Ok(employeeDto);
        }

        // PUT api/<WorkerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(int id, [FromBody] EmployeePutModel e)
        {
            var employeeToUpdate = await _service.GetWorkerByIdAsync(id);
            if (employeeToUpdate is null)
                return NotFound();

            var employee = _mapper.Map<Employee>(e);
            Employee UpdatedEmployee = await _service.UpdateWorkerAsync(id, employee);

            if (UpdatedEmployee is null)
                return BadRequest();

            var employeeDto = _mapper.Map<EmployeeDto>(UpdatedEmployee);
            return Ok(employeeDto);
        }

        // PUT api/<WorkerController>/5
        [HttpPut("{id}/{status}")]
        public async Task<ActionResult<Employee>> Put(int id, bool status)
        {
            var employeeToUpdate = await _service.GetWorkerByIdAsync(id);
            if (employeeToUpdate is null)
                return NotFound();

            Employee e = await _service.UpdateWorkerStatusAsync(id, status);
            if (e is null)
                return BadRequest();

            var employeeDto = _mapper.Map<EmployeeDto>(e);
            return Ok(employeeDto);
        }
    }
}
