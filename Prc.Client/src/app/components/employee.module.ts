import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    MatDialogModule,
   
   
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} } // הוסף את MatDialogRef ל־providers
  ]
})
export class EmployeeModule { }
