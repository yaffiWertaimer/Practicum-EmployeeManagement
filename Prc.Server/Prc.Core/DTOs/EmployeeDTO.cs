using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string IdNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime StartWorkingDay { get; set; }
        public bool IsActive { get; set; }
        public List<EmployeeRoleDTO> Roles { get; set; }

    }
}
