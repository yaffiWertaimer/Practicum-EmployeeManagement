using Prc.Core.Entities;

namespace Prc.API.Models
{
    public class EmployeeRolePostModel
    {
        public int RoleId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
