using Prc.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prc.Core.DTOs
{
    public class EmployeeRoleDTO
    {
        public int RoleId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
