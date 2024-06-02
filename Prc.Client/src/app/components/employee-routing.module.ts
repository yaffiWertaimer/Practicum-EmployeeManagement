import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  { path: 'add-employee', component: EmployeeFormComponent, data: { isEdit: false } },
  { path: 'edit-employee/:id', component: EmployeeFormComponent, data: { isEdit: true } },
  { path: '', redirectTo: 'add-employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
