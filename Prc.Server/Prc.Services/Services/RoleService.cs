using Prc.Core.Entities;
using Prc.Core.Repositories;
using Prc.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Services.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }
        public async Task<Role> GetRoleAsync(int id)
        {
            return await _roleRepository.GetRoleAsync(id);
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            return await _roleRepository.AddRoleAsync(role);

        }
        public async Task<Role> DeleteRoleAsync(int id)
        {
            return await _roleRepository.DeleteRoleAsync(id);

        }
        public async Task<Role> UpdateRoleAsync(int id, Role role)
        {
            return await _roleRepository.UpdateRoleAsync(id, role);

        }
    }
}
