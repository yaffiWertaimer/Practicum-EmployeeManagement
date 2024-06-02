using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetEmployeesAsync();

        public Task<Employee> GetEmployeeByIdAsync(int id);

        public Task<Employee> AddEmployeeAsync(Employee employee);

        public Task<Employee> DeleteEmployeeAsync(int id);

        public Task<Employee> UpdateEmployeeAsync(int id, Employee employee);

    }
}
