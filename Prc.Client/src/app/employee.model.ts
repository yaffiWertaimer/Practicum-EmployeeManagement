import { EmployeeRole } from "./employeeRole.model"


export class Employee{
    id!:number
    idNumber!:string
    firstName!:string
    lastName!:string
    gender!:string
    dateOfBirth!:string
    startWorkingDay!:string
    isActive!:Boolean
    roles!:EmployeeRole[];

   
}