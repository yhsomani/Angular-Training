import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee.interface';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="parent-box" style="border-color: #6f42c1;">
      <h3>Employee Enrollment Form</h3>
      <form (ngSubmit)="addEmployee()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="employee.name"
            name="name"
            class="sm-text-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="employee.email"
            name="email"
            class="sm-text-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            [(ngModel)]="employee.phone"
            name="phone"
            class="sm-text-input"
          />
        </div>
        <button type="submit" class="btn btn-save">Add Employee</button>
        <button type="button" class="btn" (click)="clearForm()">Clear</button>
      </form>
    </div>
  `,
  styles: [
    `.form-group { margin-bottom: 1rem; text-align: left; }`,
    `.form-group label { display: block; margin-bottom: 0.25rem; }`,
    `button { margin-right: 5px; }`
  ],
})
export class EmployeeFormComponent {
  employee: Employee = { name: '', email: '', phone: '' };
  @Output() employeeAdded = new EventEmitter<Employee>();

  addEmployee() {
    this.employeeAdded.emit({ ...this.employee }); // Emit a copy
    this.clearForm();
  }
  clearForm() {
    this.employee = { name: '', email: '', phone: '' };
  }
}

