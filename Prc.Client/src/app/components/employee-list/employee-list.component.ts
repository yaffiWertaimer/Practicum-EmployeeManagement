import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee.model';
import { ExcelService } from '../../services/excel.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import "primeicons/primeicons.css";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './employee-list.component.html',
   styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private excelService: ExcelService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data.filter(employee => employee.isActive);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: { isEdit: true, employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  
  deleteEmployee(employee: Employee): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this employee?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        alert('employee.isActive'+employee.isActive)
        this.employeeService.deleteEmployee(employee.id).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'The employee has been deleted.',
              'success'
            );
            alert('before loadEmployees')
            this.loadEmployees();
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the employee. Please try again.',
              'error'
            );
            console.error('Error updating employee status', error);
          }
        });
      }
    });
  }
  filterEmployees(): Employee[] {
    return this.employees.filter(employee => 
      employee.firstName.includes(this.searchQuery) ||
      employee.lastName.includes(this.searchQuery) ||
      employee.idNumber.includes(this.searchQuery)
    );
  }

  exportToExcel(): void {
    const filteredEmployees = this.filterEmployees().map(emp => ({
      firstName: emp.firstName,
      lastName: emp.lastName,
      idNumber: emp.idNumber,
      startWorkingDay: emp.startWorkingDay,
    }));
    this.excelService.exportAsExcelFile(filteredEmployees, 'Employees');
  }
}
