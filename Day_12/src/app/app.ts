import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo';
import { ParentComponent1 } from './parent-1/parent-1';
import { ParentComponent2 } from './parent-2/parent-2';
import { ParentComponent3 } from './parent-3/parent-3';
import { ParentComponent5 } from './parent-4/parent-4';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeListComponent } from './employee-list/employee-list';
import { ProductsComponent } from './products/products';
import { DirectivePart1Component } from './directive-demo/directive-demo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule
    TodoComponent,
    ParentComponent1,
    ParentComponent2,
    ParentComponent3,
    ParentComponent5,
    EmployeeFormComponent,
    EmployeeListComponent,
    ProductsComponent,
    DirectivePart1Component
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  currentView = signal<'todo' | 'interactions' | 'directives'>('todo');
  employeeToAdd: any;

  addEmployee(employee: any) {
    this.employeeToAdd = { ...employee, id: Math.random() };
  }
}