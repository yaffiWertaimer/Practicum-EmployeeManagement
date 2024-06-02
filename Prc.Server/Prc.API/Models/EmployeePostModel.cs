using Prc.Core.Entities;

namespace Prc.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdNumber { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime StartWorkingDay { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }

    }
}
