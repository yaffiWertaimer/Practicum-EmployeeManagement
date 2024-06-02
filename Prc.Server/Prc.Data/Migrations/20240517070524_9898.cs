using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prc.Data.Migrations
{
    public partial class _9898 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IDNumber",
                table: "Employees",
                newName: "IdNumber");

            migrationBuilder.RenameColumn(
                name: "EntryWorkDate",
                table: "Employees",
                newName: "StartWorkingDay");

            migrationBuilder.RenameColumn(
                name: "BirthDate",
                table: "Employees",
                newName: "DateOfBirth");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "EmploeeRole",
                newName: "EntryDate");

            migrationBuilder.RenameColumn(
                name: "IsAdministrative",
                table: "EmploeeRole",
                newName: "IsAdmin");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdNumber",
                table: "Employees",
                newName: "IDNumber");

            migrationBuilder.RenameColumn(
                name: "StartWorkingDay",
                table: "Employees",
                newName: "EntryWorkDate");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Employees",
                newName: "BirthDate");

            migrationBuilder.RenameColumn(
                name: "IsAdmin",
                table: "EmploeeRole",
                newName: "IsAdministrative");

            migrationBuilder.RenameColumn(
                name: "EntryDate",
                table: "EmploeeRole",
                newName: "StartDate");
        }
    }
}
