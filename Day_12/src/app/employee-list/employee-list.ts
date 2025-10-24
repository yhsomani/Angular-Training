import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-box">
      <h4>Employee Records</h4>
      @if (employees.length > 0) {
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          @for (emp of employees; track emp.email) {
          <tr>
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ emp.phone }}</td>
          </tr>
          }
        </tbody>
      </table>
      } @else {
      <p>No employees to display.</p>
      }
    </div>
  `,
  styles: [
    `.child-box { border-color: #6f42c1; }`,
  ],
})
export class EmployeeListComponent {
  employees: any[] = [];

  @Input()
  set employee(employee: any) {
    if (employee) {
      this.employees.push(employee);
    }
  }
}

