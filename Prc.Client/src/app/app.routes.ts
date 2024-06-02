import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
{ path: '', redirectTo: '/employee-list', pathMatch: 'full' } ,// ניתוב ברירת מחדל

{ path: 'employee-list', component: EmployeeListComponent },

{path:'employee-form',component:EmployeeFormComponent},

{ path: '**', component: NotFoundComponent }

];

