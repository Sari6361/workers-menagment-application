using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using static Worker.API.AuthorizationToken;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
    public class MenagerController : ControllerBase
    {
        private readonly IMenagerService _menagerService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public MenagerController(IMenagerService menagerService, IMapper mapper, IConfiguration configuration)
        {
            _menagerService = menagerService;
            _mapper = mapper;
            _configuration = configuration;
        }

        //// get: api/<menagercontroller>
        [HttpGet]
        public IEnumerable<MenagerDto> Get()
        {
            var menagers = _menagerService.GetMenagers();
            return _mapper.Map<IEnumerable<MenagerDto>>(menagers);

        }

        // GET api/<MenagerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenagerDto>> Get(int id)
        {
            var menager = await _menagerService.GetMenagerByIdAsync(id);
            if (menager is null)
                return NotFound();
            var menagerDto = _mapper.Map<MenagerDto>(menager);
            return Ok(menagerDto);
        }

        [HttpGet("workers/{id}")]
        public async Task<ActionResult<EmployeeDto[]>> GetWorkers(int id)
        {
            var menager = await _menagerService.GetMenagerByIdAsync(id);
            if (menager is null)
                return NotFound();
            var menagerDto = _mapper.Map<MenagerDto>(menager);
            var menagersEmployee = _mapper.Map<IEnumerable<EmployeeDto>>(menagerDto.Workers);
            return Ok(menagersEmployee);
        }


        // POST api/<MenagerController>
        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] MenagerPostModel m)
        {
            var menagerToAdd = _mapper.Map<Menager>(m);

            var exit = _menagerService.GetMenagers().FindAll(c => (c.UserName is null || c.UserName.Equals(m.UserName)) && (c.Password.Equals(m.Password)));
            if (exit?.Count > 0)
                return Unauthorized(new { Error = "Exit" });

            var addedMenager = await _menagerService.AddMenagerAsync(menagerToAdd);

            Console.WriteLine("add menager", addedMenager?.FirstName);

            if (addedMenager is null)
                return BadRequest();

            var menagerDto = _mapper.Map<MenagerDto>(addedMenager);
            var menagerLogin = _mapper.Map<LoginModel>(addedMenager);
            var tokenString = MakeToken(menagerLogin, _configuration);
            return Ok(new { Token = tokenString, Menager_ = menagerDto });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            Console.WriteLine("log in");
            var exit = _menagerService.GetMenagers().FindAll(c => (c.UserName is null || c.UserName.Equals(loginModel.UserName)));
            if (exit is null || exit.Count == 0)
                return Unauthorized(new { Error = "Name" });

            var menager = exit.Find(c => (c.Password.Equals(loginModel.Password)));

            if (menager is null)
                return Unauthorized(new { Error = "Password" });
            Console.WriteLine("menager -" + menager.UserName);
            var m = await _menagerService.GetMenagerByNameAndPassword(loginModel.UserName, loginModel.Password);
            var menagerDto = _mapper.Map<MenagerDto>(m);

            var tokenString = MakeToken(loginModel, _configuration);

            return Ok(new { Token = tokenString, Menager_ = menagerDto });
        }


        // PUT api/<MenagerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<MenagerDto>> Put(int id, [FromBody] MenagerPutModel m)
        {
            var menagerToUpdate = _mapper.Map<Menager>(m);
            var menager = await _menagerService.GetMenagerByIdAsync(id);
            if (menager is null)
                return NotFound();

            var updatedMenager = await _menagerService.UpdateMenagerAsync(id, menagerToUpdate);
            if (updatedMenager is null)
                return BadRequest();
            var menagerDto = _mapper.Map<MenagerDto>(updatedMenager);
            return Ok(menagerDto);
        }
    }
}
