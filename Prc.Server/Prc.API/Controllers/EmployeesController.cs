using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Prc.API.Models;
using Prc.Core.DTOs;
using Prc.Core.Entities;
using Prc.Core.Services;
using Prc.Data.Repositories;
using Prc.Services;
using Prc.Services.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Prc.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeesService, IMapper mapper)
        {
            _employeeService = employeesService;
            _mapper = mapper;
        }

        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetAsync()
        {
            var emp = await _employeeService.GetEmployeesAsync();
            var empDTO = emp.Select(e => _mapper.Map<EmployeeDTO?>(e));
            return Ok(empDTO);
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            var res = await _employeeService.GetEmployeeByIdAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : NotFound(resDto);
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _employeeService.AddEmployeeAsync(employee);
            var resExist = await _employeeService.GetEmployeeByIdAsync(res.Id);
            var resDto = _mapper.Map<EmployeeDTO>(resExist);
            return Ok(resDto);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _employeeService.UpdateEmployeeAsync(id, employee);
            var resExist = await _employeeService.GetEmployeeByIdAsync(res.Id);
            var resDto = _mapper.Map<EmployeeDTO>(resExist);
            return Ok(resDto);
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var res = await _employeeService.DeleteEmployeeAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);

        }
    }
}

