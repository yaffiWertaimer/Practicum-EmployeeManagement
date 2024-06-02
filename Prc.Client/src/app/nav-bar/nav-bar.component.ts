import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NavigationService } from '../services/navigation.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';


import { InputTextModule } from 'primeng/inputtext';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,RouterOutlet,ToolbarModule,ButtonModule, SplitButtonModule,InputTextModule,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(private navigationService: NavigationService, private employeeService: EmployeeService,private router: Router) {}

  ngOnInit() {
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
}

navigateToEmployees(): void {
  alert('navigateToEmployees')
  this.router.navigate(['/employee-list']);
}
// navigateToAddEmployees(): void {
//   alert('navigateToAddEmployees')
//   this.router.navigate(['/employee-form']);
// }
navigateToHome(): void {
  alert('navigateToHome')
  this.router.navigate(['/employee-list']);
}


  exportToExcel(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      const worksheet = XLSX.utils.json_to_sheet(employees);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'employees');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
