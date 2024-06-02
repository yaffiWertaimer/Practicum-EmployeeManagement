using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Services
{
    public interface IRoleService
    {
        public Task<IEnumerable<Role>> GetRolesAsync();
        public Task<Role> GetRoleAsync(int id);
        public Task<Role> AddRoleAsync(Role role);
        public Task<Role> DeleteRoleAsync(int id);
        public Task<Role> UpdateRoleAsync(int id, Role role);

    }
}
