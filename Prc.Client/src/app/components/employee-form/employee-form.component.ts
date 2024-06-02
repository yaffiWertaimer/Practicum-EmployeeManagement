
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';

import { Employee } from '../../employee.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Role } from '../../role.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({

  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterOutlet, MatIconModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']

})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  formTitle: string = '';
  submitButtonText: string = '';
  roleList: Role[] = [];
  index!: number;
  roleListTemp: Role[] = [];
  selectedRoles = new Set<number>();


  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.futureDateValidator]],
      startWorkingDay: ['', [Validators.required, this.futureDateValidator]],
      roles: this.formBuilder.array([], Validators.required)

    });
    this.loadRoles();

    if (this.data.isEdit && this.data.employee.id) {
      this.employeeService.getEmployeeById(this.data.employee.id).subscribe((employee: Employee) => {
        this.populateForm(employee);
      });
    }
    this.formTitle = this.data.isEdit ? 'ערוך עובד' : 'הוסף עובד חדש';
    this.submitButtonText = this.data.isEdit ? 'עדכן' : 'הוסף';


  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }


    const formValue = this.employeeForm.value;
    const employee: Employee = {
      ...formValue,
      id: this.data.isEdit ? this.data.employee.id : undefined,
      gender: formValue.gender === 'female' ? 1 : 0, // Adding gender conversion
      dateOfBirth: new Date(formValue.dateOfBirth).toISOString(),
      startWorkingDay: new Date(formValue.startWorkingDay).toISOString(),
      roles: formValue.roles.map((role: any) => ({
        ...role,
        isAdmin: role.IsAdmin, // Ensure correct casing
        entryDate: new Date(role.entryDate).toISOString()
      }))
    };


    if (this.data.isEdit) {
      console.log('employee' + JSON.stringify(employee.id));
      this.employeeService.updateEmployee(employee).subscribe(
        (updatedEmployee) => {
          Swal.fire({
            icon: 'success',
            title: 'הצלחה!',
            text: 'פרטי העובד עודכנו בהצלחה.',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(updatedEmployee);
        },
        (error) => {
          console.error('Failed to update employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'אופס...',
            text: 'משהו השתבש, נסה שוב מאוחר יותר.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
    } else {
      this.employeeService.addEmployee(employee).subscribe(
        (newEmployee) => {
          Swal.fire({
            icon: 'success',
            title: 'הצלחה!',
            text: 'העובד נוסף בהצלחה.',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(newEmployee);
        },
        (error) => {
          console.error('Failed to add employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'אופס...',
            text: 'משהו השתבש, נסה שוב מאוחר יותר.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
    }

  }
 

  populateForm(employee: Employee): void {
    alert('populateForm')
    alert('employee.gender '+employee.gender)
    this.employeeForm.patchValue({
      idNumber: employee.idNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender :employee.gender ===  'female'?1:0,
      dateOfBirth: new Date(employee.dateOfBirth).toISOString().substring(0, 10),  // To set correct date format
      startWorkingDay: new Date(employee.startWorkingDay).toISOString().substring(0, 10),  // To set correct date format
    });


    employee.roles.forEach(role => {
      const roleGroup = this.formBuilder.group({
        roleId: [role.RoleId, Validators.required],
        isAdmin: [role.IsAdmin],
        entryDate: [new Date(role.EntryDate).toISOString().substring(0, 10), Validators.required]  // To set correct date format
      });
      this.rolesFormArray.push(roleGroup);
    });

    this.displayRoleDescriptions(employee.roles);
  }

  displayRoleDescriptions(roles: any[]): void {
    const roleDescriptionsDiv = document.getElementById('roleDescriptions');
    if (roleDescriptionsDiv) {
      roleDescriptionsDiv.innerHTML = ''; // Clear previous content

      roles.forEach(role => {
        const roleDescription = document.createElement('p');
        roleDescription.textContent = `Role ID: ${role.RoleId}, Admin: ${role.IsAdmin ? 'Yes' : 'No'}, Entry Date: ${role.EntryDate}`;
        roleDescriptionsDiv.appendChild(roleDescription);
      });
    }
  }
  isEditMode(): boolean {
    return this.data.isEdit;
  }
  isAddMode(): boolean {
    return !this.data.isEdit;
  }


  addRole(): void {
    if (this.index > 0) {
      this.index--;
      this.rolesFormArray.push(this.formBuilder.group({
        roleId: ['', Validators.required],
        isAdmin: [false],
        entryDate: ['', [Validators.required, this.futureDateValidator]]
      }));
    } else {
      Swal.fire({
        title: "No more roles available",
        text: "",
        icon: "warning"
      });
    }
  }
 

  get rolesFormArray(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  }

  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate > currentDate ? { 'invalidDate': true } : null;
  }
  loadRoles(): void {
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roleList = roles;
        this.index = this.roleList.length;
      },
      (error) => {
        console.error('Failed to load roles:', error);
      }
    );
  }
  changeRole(): void {
    this.roleListTemp = [];
    this.rolesFormArray.controls.forEach(control => {
      const roleId = control.get('roleId')?.value;
      const role = this.roleList.find(r => r.id == roleId);
      if (role) {
        this.roleListTemp.push(role);
      }
    });
  }
  isRoleDisabled(roleId: Number): boolean {
    return this.roleListTemp.some(role => role.id == roleId);
  }
  removeRole(i: number): void {
    if (this.rolesFormArray && this.rolesFormArray.length > i) {
      const removedRole = this.rolesFormArray.at(i);
      if (removedRole) {
        const roleIdControl = removedRole.get('roleId');
        if (roleIdControl) {
          const removedRoleId = roleIdControl.value;
          this.index++;
          this.selectedRoles.delete(removedRoleId);
          this.roleListTemp = this.roleListTemp.filter(role => role.id != removedRoleId);
        }
        this.rolesFormArray.removeAt(i);
      }
    }
  }

}

