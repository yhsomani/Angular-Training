# Comprehensive Angular Notes

## Introduction to Angular

- **Overview**: Angular is a robust, open-source JavaScript framework for building dynamic single-page applications (SPAs). It emphasizes modularity, scalability, and performance, making it ideal for large-scale applications.
- **Language**: Written in TypeScript, leveraging type safety and modern JavaScript features.
- **Maintainer**: Google, with continuous updates and community support.
- **Evolution**:
  - **AngularJS (1.x)**: Initial version, based on plain JavaScript, introduced in 2010.
  - **Angular 2+**: Complete rewrite, component-based, TypeScript-driven, launched in 2016.
  - **Latest Stable Version**: Angular 20 (released May 28, 2025), focusing on performance enhancements, developer experience improvements, and stabilized features like control flow and zoneless applications.
- **Key Features**:
  - Component-based architecture.
  - Two-way data binding and reactive programming.
  - Dependency injection for modular services.
  - Built-in routing, HTTP client, and form handling.
  - CLI for streamlined development and testing.

## Installation and Setup

- **Prerequisites**:
  - Node.js and npm installed.
  - Verify versions: `node -v`, `npm -v`.
- **Install Angular CLI**:
  ```bash
  npm install -g @angular/cli
  ```
- **Check CLI Version**:
  ```bash
  ng -v
  ng --version
  ```
- **CLI Help**:
  ```bash
  ng --help
  ```
- **Create New Application**:
  ```bash
  ng new my-app
  ```
  - Prompts during creation:
    - **Stylesheet Format**: CSS (default), SCSS, SASS, LESS.
    - **Server-Side Rendering (SSR)/Static Site Generation (SSG)**: Optional, default is No.
    - **Zoneless Application**: Optional, default is No (uses zone.js for change detection).
    - **AI Tools**: Configure Angular with AI tools (default: None).
  - Optional Flags:
    - `--skip-tests`: Skip generating test files (`.spec.ts`).
    - `--dry-run`: Simulate project creation without file changes.
    - `--skip-install`: Skip installing dependencies (run `npm install` later).
    - `--style scss`: Use SCSS instead of CSS.
  - Example Commands:
    ```bash
    ng new example --skip-tests
    ng new example --dry-run
    ng new example --skip-install
    ng new example --style scss
    ```
- **Run Application**:
  ```bash
  ng serve
  ```
  - Default port: 4200 (`http://localhost:4200`).
  - Use `--port` to change: `ng serve --port 4300`.

## Project Structure

- **Generated Files/Folders**:
  - `angular.json`: Configuration for builds, tests, and serves.
  - `package.json`: Lists dependencies and scripts.
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.ts`: TypeScript configurations for app and tests.
  - `.vscode/`: VS Code settings (extensions, launch, tasks).
  - `public/`: Static assets (e.g., `favicon.ico`).
  - `src/`:
    - `main.ts`: Entry point, bootstraps the root module.
    - `index.html`: Root HTML with `<app-root>` selector.
    - `styles.css`: Global styles.
    - `app/`:
      - `app.component.ts`: Root component logic.
      - `app.component.html`: Root component template.
      - `app.component.css`: Root component styles.
      - `app.component.spec.ts`: Unit tests for root component.
      - `app.config.ts`: Application configuration.
      - `app.routes.ts`: Routing configuration.
- **Key Notes**:
  - `index.html` loads the root component via `<app-root>`.
  - `main.ts` bootstraps `AppModule`.
  - `src/` contains the core application code.

## Components

- **Definition**: Core building blocks of Angular applications, encapsulating HTML, CSS, and TypeScript logic.
- **Structure**:
  - `.ts`: Component logic with `@Component` decorator.
  - `.html`: Template for rendering.
  - `.css`: Scoped styles.
  - `.spec.ts`: Unit tests (optional).
- **Generate Component**:
  ```bash
  ng generate component <name>
  ng g c <name>
  ```
  - Flags:
    - `--flat`: Generate files in `src/app` without a subfolder.
    - `--inline-template`: Embed HTML in `.ts` file.
    - `--inline-style`: Embed CSS in `.ts` file.
    - `--skip-tests`: Skip test file generation.
  - Example:
    ```bash
    ng g c home
    ng g c about --flat --inline-template --inline-style --skip-tests
    ```
- **Component Example**:
  ```typescript
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent {
    title = 'Welcome to Home';
  }
  ```
  ```html
  <!-- home.component.html -->
  <h1>{{ title }}</h1>
  ```
- **Best Practices**:
  - Keep components small and focused.
  - Use descriptive selectors (e.g., `app-home`).
  - Encapsulate logic in services for reusability.

### Component Communication

- **Parent to Child**:
  - Use `@Input()` decorator to pass data.
  - Example:
    ```typescript
    // parent.component.ts
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-parent',
      template: `<app-child [childData]="parentData"></app-child>`
    })
    export class ParentComponent {
      parentData = 'Data from parent';
    }
    ```
    ```typescript
    // child.component.ts
    import { Component, Input } from '@angular/core';

    @Component({
      selector: 'app-child',
      template: `<p>{{ childData }}</p>`
    })
    export class ChildComponent {
      @Input() childData: string = '';
    }
    ```
- **Child to Parent**:
  - **Using `@Output` and `EventEmitter`**:
    ```typescript
    // child.component.ts
    import { Component, Output, EventEmitter } from '@angular/core';

    @Component({
      selector: 'app-child',
      template: `<button (click)="sendData()">Send to Parent</button>`
    })
    export class ChildComponent {
      @Output() dataEvent = new EventEmitter<string>();

      sendData() {
        this.dataEvent.emit('Data from child');
      }
    }
    ```
    ```typescript
    // parent.component.ts
    @Component({
      selector: 'app-parent',
      template: `<app-child (dataEvent)="receiveData($event)"></app-child><p>{{ message }}</p>`
    })
    export class ParentComponent {
      message: string = '';

      receiveData(data: string) {
        this.message = data;
      }
    }
    ```
  - **Using `@ViewChild` and `AfterViewInit`**:
    ```typescript
    // parent.component.ts
    import { Component, ViewChild, AfterViewInit } from '@angular/core';
    import { ChildComponent } from './child.component';

    @Component({
      selector: 'app-parent',
      template: `<app-child #childRef></app-child>`
    })
    export class ParentComponent implements AfterViewInit {
      @ViewChild('childRef') child: ChildComponent | undefined;

      ngAfterViewInit() {
        console.log(this.child?.childData);
      }
    }
    ```

## Data Binding

- **Types**:
  - **Interpolation**: `{{ expression }}` for displaying component data.
  - **Property Binding**: `[property]="expression"` for binding data to DOM properties.
  - **Event Binding**: `(event)="handler()"` for responding to user actions.
  - **Two-Way Binding**: `[(ngModel)]="property"` for syncing view and component (requires `FormsModule`).
- **Examples**:
  ```html
  <!-- Interpolation -->
  <p>Hello {{ username }}</p>

  <!-- Property Binding -->
  <img [src]="imageUrl" [title]="title">

  <!-- Event Binding -->
  <button (click)="showAlert()">Click Me</button>
  <input (input)="updateName($event)">
  <select (change)="onSelectionChange($event)">

  <!-- Two-Way Binding -->
  <input [(ngModel)]="username">
  <select [(ngModel)]="selectedFruit">
    <option *ngFor="let fruit of fruits" [value]="fruit">{{ fruit }}</option>
  </select>
  ```
- **Component Code**:
  ```typescript
  export class AppComponent {
    username: string = '';
    imageUrl: string = 'path/to/image.jpg';
    title: string = 'Image Title';
    selectedFruit: string = '';
    fruits: string[] = ['Apple', 'Banana', 'Orange'];

    showAlert() { alert('Button clicked!'); }
    updateName(event: Event) { this.username = (event.target as HTMLInputElement).value; }
    onSelectionChange(event: Event) { this.selectedFruit = (event.target as HTMLSelectElement).value; }
  }
  ```
- **Event Binding Examples**:
  ```html
  <!-- Keyup -->
  <input #box (keyup)="onKey(box.value)">
  <p>{{ values }}</p>

  <!-- Keyup Enter -->
  <input #box (keyup.enter)="onEnter(box.value)">
  <p>{{ value }}</p>

  <!-- Keyup Enter or Blur -->
  <input #box (keyup.enter)="update(box.value)" (blur)="update(box.value)">
  <p>{{ value }}</p>
  ```
  ```typescript
  export class AppComponent {
    values = '';
    value = '';
    onKey(value: string) { this.values += value + ' | '; }
    onEnter(value: string) { this.value = value; }
    update(value: string) { this.value = value; }
  }
  ```

## Control Flow (Angular 17+)

- **Overview**: Introduced in Angular 17, built-in control flow (`@for`, `@if`, `@switch`, `@empty`) replaces legacy directives (`*ngFor`, `*ngIf`, `*ngSwitch`).
- **Enable**:
  ```bash
  ng g @angular/core:control-flow
  ```
- **Examples**:
  ```html
  <!-- @for -->
  <ul>
    @for (item of items; track item.id) {
      <li>{{ item.name }}</li>
    } @empty {
      <li>No items available.</li>
    }
  </ul>
  ```
  ```typescript
  items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' }
  ];
  ```
  ```html
  <!-- @if -->
  @if (isAvailable) {
    <div>Available</div>
  } @else {
    <div>Not Available</div>
  }
  ```
  ```typescript
  isAvailable = true;
  ```
  ```html
  <!-- @switch -->
  <button (click)="toggleValue()">Toggle Value</button>
  @switch (selectedOption) {
    @case ('option1') { <div>This is Option 1</div> }
    @case ('option2') { <div>This is Option 2</div> }
    @default { <div>Select an Option</div> }
  }
  ```
  ```typescript
  selectedOption: string = 'option1';
  toggleValue() {
    this.selectedOption = this.selectedOption === 'option1' ? 'option2' : 'option1';
  }
  ```
- **Best Practices**:
  - Use `track` in `@for` for efficient change detection.
  - Prefer new control flow over legacy directives for better performance and readability.

## Directives

- **Types**:
  - **Structural**: Modify DOM structure (e.g., `@for`, `@if`, legacy `*ngFor`, `*ngIf`).
  - **Attribute**: Modify element behavior/appearance (e.g., `ngClass`, `ngStyle`).
  - **Custom**: User-defined directives.
- **Generate Custom Directive**:
  ```bash
  ng generate directive <name>
  ```
- **Example Custom Directive**:
  ```typescript
  import { Directive, ElementRef } from '@angular/core';

  @Directive({
    selector: '[appHighlight]'
  })
  export class HighlightDirective {
    constructor(el: ElementRef) {
      el.nativeElement.style.backgroundColor = 'yellow';
    }
  }
  ```
  ```html
  <p appHighlight>Highlighted text</p>
  ```

## Modules

- **Purpose**: Organize code into cohesive units; manage dependencies.
- **Root Module**: `AppModule` bootstraps the application.
- **Example**:
  ```typescript
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppComponent } from './app.component';

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
  ```
- **Best Practices**:
  - Create feature modules for specific functionality.
  - Use lazy loading for performance:
    ```typescript
    { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
    ```

## Services and Dependency Injection

- **Services**: Reusable logic for business rules, data access, etc.
- **Generate**:
  ```bash
  ng generate service <name>
  ```
- **Example**:
  ```typescript
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class DataService {
    getData() {
      return ['Item 1', 'Item 2'];
    }
  }
  ```
  ```typescript
  import { Component } from '@angular/core';
  import { DataService } from './data.service';

  @Component({
    selector: 'app-root',
    template: `<p>{{ data }}</p>`
  })
  export class AppComponent {
    data: string[] = [];
    constructor(private dataService: DataService) {
      this.data = dataService.getData();
    }
  }
  ```
- **DI Best Practices**:
  - Use `providedIn: 'root'` for singleton services.
  - Inject services in constructors.
  - Avoid tight coupling; use interfaces for service contracts.

## Routing

- **Setup**: Define routes in `app.routes.ts`.
- **Example**:
  ```typescript
  import { Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { AboutComponent } from './about/about.component';

  export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
  ];
  ```
- **Router Outlet**:
  ```html
  <router-outlet></router-outlet>
  ```
- **Navigation**:
  ```html
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
  ```
- **Best Practices**:
  - Use lazy loading for large apps.
  - Guard routes with `canActivate` for authentication.
  - Handle 404 with `{ path: '**', component: NotFoundComponent }`.

## Forms

- **Types**:
  - **Template-Driven**: Simple, uses `ngModel`.
  - **Reactive**: Flexible, uses `ReactiveFormsModule`.
- **Template-Driven Example**:
  ```html
  <form #myForm="ngForm">
    <input name="username" ngModel>
    <button type="submit" [disabled]="myForm.invalid">Submit</button>
  </form>
  ```
- **Reactive Example**:
  ```typescript
  import { FormGroup, FormControl, Validators } from '@angular/forms';

  @Component({
    template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input formControlName="username">
        <button type="submit" [disabled]="form.invalid">Submit</button>
      </form>
    `
  })
  export class AppComponent {
    form = new FormGroup({
      username: new FormControl('', Validators.required)
    });

    onSubmit() {
      console.log(this.form.value);
    }
  }
  ```
- **Best Practices**:
  - Use reactive forms for complex logic.
  - Validate forms with built-in or custom validators.
  - Handle form submission errors gracefully.

## HTTP Client

- **Setup**: Import `HttpClientModule` in `AppModule`.
- **Example**:
  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    constructor(private http: HttpClient) {}
    getData() {
      return this.http.get('https://api.example.com/data');
    }
  }
  ```
- **Best Practices**:
  - Handle HTTP errors with `catchError`.
  - Use RxJS operators for data transformation.
  - Secure API calls with proper headers.

## Pipes

- **Purpose**: Transform data in templates (e.g., format dates, currency).
- **Built-in Pipes**: `date`, `currency`, `uppercase`, etc.
- **Custom Pipe**:
  ```bash
  ng generate pipe <name>
  ```
  ```typescript
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({ name: 'custom' })
  export class CustomPipe implements PipeTransform {
    transform(value: string): string {
      return value.toUpperCase();
    }
  }
  ```
  ```html
  <p>{{ 'hello' | custom }}</p> <!-- Output: HELLO -->
  ```
- **Best Practices**:
  - Keep pipes pure for performance.
  - Use pipes for simple transformations; complex logic in services.

## Lifecycle Hooks

- **Key Hooks**:
  - `ngOnInit`: Initialize component after inputs are set.
  - `ngOnChanges`: Respond to input changes.
  - `ngAfterViewInit`: After view and child views are initialized.
  - `ngOnDestroy`: Cleanup before component destruction.
- **Example**:
  ```typescript
  import { Component, OnInit, OnDestroy } from '@angular/core';

  @Component({
    selector: 'app-example',
    template: `<p>Example</p>`
  })
  export class ExampleComponent implements OnInit, OnDestroy {
    ngOnInit() {
      console.log('Component initialized');
    }
    ngOnDestroy() {
      console.log('Component destroyed');
    }
  }
  ```
- **Best Practices**:
  - Use `ngOnInit` for initialization logic.
  - Clean up subscriptions in `ngOnDestroy` to prevent memory leaks.

## Testing

- **Tools**: Jasmine (test framework), Karma (test runner).
- **Generated Files**: `.spec.ts` for components, services, etc.
- **Run Tests**:
  ```bash
  ng test
  ```
- **Best Practices**:
  - Write unit tests for components and services.
  - Mock dependencies with Jasmine spies.
  - Test edge cases and error handling.

## Best Practices (Summary)

- **Code Organization**:
  - Use feature modules and lazy loading.
  - Keep components small and single-purpose.
  - Centralize logic in services.
- **Performance**:
  - Use OnPush change detection for components.
  - Optimize templates with pure pipes and control flow.
  - Lazy-load routes and modules.
- **Maintainability**:
  - Follow Angular style guide (e.g., prefix selectors with `app-`).
  - Use TypeScript interfaces for type safety.
  - Document complex logic with comments.
- **Security**:
  - Sanitize user inputs to prevent XSS.
  - Secure API calls with proper authentication.

## Cheat Sheet

- **CLI Commands**:
  ```bash
  npm i -g @angular/cli           # Install CLI
  ng new <name> [--flags]        # Create new app
  ng g c <name> [--flags]        # Generate component
  ng g s <name>                  # Generate service
  ng g pipe <name>               # Generate pipe
  ng g directive <name>          # Generate directive
  ng serve                       # Run app
  ng test                        # Run tests
  ```
- **Key Concepts**:
  - **Component**: `@Component({ selector: '...', templateUrl: '...', styleUrls: [...] })`
  - **Data Binding**:
    - Interpolation: `{{ expression }}`
    - Property: `[property]="expression"`
    - Event: `(event)="handler()"`
    - Two-Way: `[(ngModel)]="property"`
  - **Control Flow**: `@for (item of items; track item.id)`, `@if`, `@switch`
  - **Communication**:
    - Parent → Child: `@Input()`
    - Child → Parent: `@Output() new EventEmitter()`, `@ViewChild`
  - **Routing**: `Routes = [{ path: '', component: HomeComponent }]`
  - **Services**: `@Injectable({ providedIn: 'root' })`
  - **Lifecycle**: `ngOnInit`, `ngOnChanges`, `ngAfterViewInit`, `ngOnDestroy`