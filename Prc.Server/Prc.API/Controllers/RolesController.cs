using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Prc.API.Models;
using Prc.Core.DTOs;
using Prc.Core.Entities;
using Prc.Core.Services;
using System.ComponentModel.Design;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Prc.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        // GET: api/<RoleCo
        // ntroller>
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePostModel>>> GetAsync()
        {
            var roles = await _roleService.GetRolesAsync();
            var roleDTO = roles.Select(e => _mapper.Map<RoleDTO>(e));
            return Ok(roleDTO);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var res = await _roleService.GetRoleAsync(id);
            var resDto = _mapper.Map<RoleDTO>(res);
            return resDto != null ? Ok(resDto) : NotFound(resDto);

        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] RolePostModel value)
        {
            var role = _mapper.Map<Role>(value);
            var res = await _roleService.AddRoleAsync(role);
            var resDto = _mapper.Map<RoleDTO>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);

        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutAsync(int id, [FromBody] RolePostModel value)
        {
            var role = _mapper.Map<Role>(value);
            var res = await _roleService.UpdateRoleAsync(id, role);
            var resDto = _mapper.Map<RoleDTO>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);

        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var res = await _roleService.DeleteRoleAsync(id);
            var resDto = _mapper.Map<RoleDTO>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);

        }
    }
}
