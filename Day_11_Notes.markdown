# Comprehensive Angular Notes

## Introduction to Angular
Angular is a powerful, open-source, TypeScript-based framework maintained by Google, designed for building dynamic, scalable single-page applications (SPAs). The stable version as of May 28, 2025, is Angular 20, emphasizing performance improvements, signals for reactive state management, and optional zoneless change detection.

- **Purpose**: Facilitates the development of SPAs with a structured, modular architecture, leveraging TypeScript for type safety and maintainability.
- **Core Features**:
  - Component-based architecture for reusable UI elements.
  - Two-way data binding for seamless UI-data synchronization.
  - Dependency injection for decoupled services.
  - RxJS-powered reactive programming for asynchronous operations.
  - Built-in routing for navigation.
  - Form validation and reactive forms.
  - Angular CLI for project scaffolding, building, and testing.
- **Advantages**:
  - Standardized project structure for large-scale applications.
  - Enhanced performance with signals and zoneless architecture.
  - Extensive ecosystem with libraries, tools, and Google support.
  - Cross-platform support (web, mobile via Ionic, desktop via Electron).
- **History**:
  - **AngularJS (1.x)**: JavaScript-based, introduced in 2010, focused on MVC.
  - **Angular 2+ (2016)**: Complete rewrite in TypeScript, component-driven.
  - **Angular 20 (2025)**: Introduces signals, improved build performance, and better tree-shaking.
- **Use Cases**:
  - Enterprise applications (e.g., dashboards, admin panels).
  - Progressive web apps (PWAs).
  - Real-time applications with reactive data flows.

**Best Practices**:
- Use TypeScript for type safety and better IDE support.
- Leverage Angular CLI for consistent project setup.
- Adopt signals for reactive state management in newer versions.
- Enable server-side rendering (SSR) or static site generation (SSG) for SEO.

## Installation and Setup
The Angular CLI is the primary tool for creating, managing, and deploying Angular applications.

- **Prerequisites**:
  - Node.js (LTS version recommended, check with `node -v`).
  - npm (Node Package Manager, check with `npm -v`).
- **Install Angular CLI**:
  ```bash
  npm install -g @angular/cli
  ```
- **Verify Installation**:
  ```bash
  ng --version
  ng -v
  ```
  Displays CLI version, Angular version, and dependencies.
- **Create New Project**:
  ```bash
  ng new my-app
  ```
  Prompts:
  - Stylesheet format: CSS, SCSS, Sass, Less (`--style=scss`).
  - SSR/SSG: Enable for SEO/performance (`--ssr`).
  - Zoneless: Exclude zone.js for modern change detection (`--zoneless`).
  - AI tools: Optional integration with Angular best practices.
  Options:
  - `--skip-tests`: Skip generating test files.
  - `--skip-install`: Skip npm install.
  - `--dry-run`: Preview file structure without creation.
  - `--style=scss`: Use SCSS instead of CSS.
- **Serve Application**:
  ```bash
  ng serve
  ```
  Runs on `http://localhost:4200` (customizable with `--port`).
- **Other CLI Commands**:
  - `ng build`: Create production build.
  - `ng test`: Run unit tests with Karma/Jasmine.
  - `ng lint`: Run ESLint for code quality.
  - `ng generate`: Scaffold components, services, etc.
  - `ng update`: Update Angular and dependencies.
- **Example Output (ng new)**:
  ```bash
  CREATE my-app/README.md (1468 bytes)
  CREATE my-app/.gitignore (604 bytes)
  CREATE my-app/angular.json (2396 bytes)
  CREATE my-app/src/app/app.component.ts (288 bytes)
  ...
  ```

**Best Practices**:
- Use LTS Node.js for stability.
- Always run `ng new` with explicit options for consistency.
- Enable SSR/SSG for public-facing apps.
- Regularly update CLI and dependencies (`ng update`).

## Project Structure
Angular projects follow a modular, standardized structure for maintainability.

- **Key Files/Folders**:
  - **`angular.json`**: Configures build targets, environments, and CLI settings.
  - **`package.json`**: Lists dependencies, scripts, and metadata.
  - **`tsconfig.json`**: TypeScript compiler options (e.g., strict mode).
  - **`src/`**: Application source code.
    - `index.html`: Entry point with `<app-root>` selector.
    - `main.ts`: Bootstraps the root module.
    - `styles.css`: Global styles.
    - `assets/`: Static files (images, JSON).
    - `public/`: Public assets (e.g., `favicon.ico`).
    - `app/`:
      - `app.component.ts`: Root component logic.
      - `app.component.html`: Root template.
      - `app.component.css`: Root styles.
      - `app.routes.ts`: Routing configuration.
      - `app.config.ts`: App-level configuration (e.g., providers).
      - `app.spec.ts`: Unit tests for root component.
- **Example `index.html`**:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>MyApp</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>
  ```

**Best Practices**:
- Store static assets in `src/assets`.
- Use environment files (`environment.ts`) for API keys.
- Modularize `src/app` with feature folders.
- Configure `angular.json` for multi-environment builds.

## Components
Components are reusable UI building blocks, encapsulating logic, template, and styles.

- **Structure**:
  - Defined with `@Component` decorator.
  - Properties: `selector`, `templateUrl`/`template`, `styleUrls`/`styles`.
- **Example**:
  ```typescript
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent {
    title = 'Home Page';
    counter = 0;
    increment() { this.counter++; }
  }
  ```
  ```html
  <!-- home.component.html -->
  <h1>{{ title }}</h1>
  <button (click)="increment()">Count: {{ counter }}</button>
  ```
- **Generate Component**:
  ```bash
  ng generate component home
  ng g c home
  ```
  Options:
  - `--flat`: Generate files in `src/app` instead of subfolder.
  - `--inline-template`: Embed HTML in `.ts`.
  - `--inline-style`: Embed CSS in `.ts`.
  - `--skip-tests`: Skip `.spec.ts` file.
- **Component Types**:
  - Root: `app.component.ts` (entry point).
  - Feature: Specific functionality (e.g., `home.component.ts`).
  - Shared: Reusable across modules.

**Best Practices**:
- Keep components small and single-purpose.
- Use descriptive selectors (e.g., `app-home`).
- Avoid complex logic in templates; move to `.ts`.
- Use inline templates/styles for simple components.

## Data Binding
Data binding synchronizes component data with the DOM.

- **Types**:
  - **Interpolation**: `{{ expression }}` – Displays component properties.
    ```html
    <p>Hello, {{ username }}</p>
    ```
  - **Property Binding**: `[property]="value"` – Binds data to DOM properties.
    ```html
    <img [src]="imageUrl" [alt]="imageAlt">
    ```
  - **Event Binding**: `(event)="handler()"` – Responds to user actions.
    ```html
    <button (click)="handleClick()">Click</button>
    ```
  - **Two-Way Binding**: `[(ngModel)]="value"` – Bidirectional sync (requires `FormsModule`).
    ```html
    <input [(ngModel)]="username">
    <p>Hello, {{ username }}</p>
    ```
- **Example**:
  ```typescript
  export class AppComponent {
    username = 'John';
    imageUrl = 'assets/image.jpg';
    imageAlt = 'Sample Image';
    handleClick() { alert('Button clicked!'); }
  }
  ```

**Best Practices**:
- Use interpolation for simple text display.
- Prefer property binding for dynamic attributes.
- Use two-way binding for forms, but avoid overuse.
- Sanitize user inputs to prevent XSS.

## Directives and Control Flow
Directives modify DOM structure or behavior. Angular 17+ introduced a modern control flow syntax.

- **Built-in Directives**:
  - `ngIf`: Conditional rendering.
  - `ngFor`: Iterate over collections.
  - `ngSwitch`: Switch-based rendering.
- **New Control Flow (v17+)**:
  - **@if**:
    ```html
    @if (isAvailable) {
      <div>Available</div>
    } @else if (isPending) {
      <div>Pending</div>
    } @else {
      <div>Not Available</div>
    }
    ```
  - **@for**:
    ```html
    @for (item of items; track item.id) {
      <li>{{ item.name }}</li>
    } @empty {
      <li>No items</li>
    }
    ```
    Use `track` for performance optimization.
  - **@switch**:
    ```html
    @switch (selectedOption) {
      @case ('option1') { <h2>Option 1</h2> }
      @case ('option2') { <h2>Option 2</h2> }
      @default { <h2>Select an option</h2> }
    }
    ```
- **Custom Directive**:
  ```typescript
  import { Directive, ElementRef, HostListener } from '@angular/core';

  @Directive({ selector: '[appHighlight]' })
  export class HighlightDirective {
    constructor(private el: ElementRef) {}
    @HostListener('mouseenter') onMouseEnter() {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }
    @HostListener('mouseleave') onMouseLeave() {
      this.el.nativeElement.style.backgroundColor = '';
    }
  }
  ```
  ```html
  <p appHighlight>Hover to highlight</p>
  ```

**Best Practices**:
- Use `trackBy` in `@for` to minimize DOM updates.
- Migrate to new control flow for better performance and readability.
- Create custom directives for reusable DOM behaviors (e.g., hover effects).
- Avoid complex logic in directive templates.

## Event Binding
Handles user interactions like clicks, keypresses, or form changes.

- **Common Events**:
  - Click: `(click)="handler()"`.
  - Input: `(input)="handler($event)"`.
  - Change: `(change)="handler($event)"`.
  - Keyup: `(keyup.enter)="handler()"`.
  - Blur: `(blur)="handler($event)"`.
- **Examples**:
  - **Click**:
    ```html
    <button (click)="showAlert()">Click Me!</button>
    ```
    ```typescript
    showAlert() { alert('Button clicked!'); }
    ```
  - **Input**:
    ```html
    <input (input)="updateName($event)">
    <p>Hello, {{ username }}</p>
    ```
    ```typescript
    updateName(event: Event) {
      this.username = (event.target as HTMLInputElement).value;
    }
    ```
  - **Change**:
    ```html
    <select (change)="onSelectionChange($event)">
      <option value="apple">Apple</option>
    </select>
    ```
    ```typescript
    onSelectionChange(event: Event) {
      this.selectedFruit = (event.target as HTMLSelectElement).value;
    }
    ```
  - **Keyup (Enter)**:
    ```html
    <input (keyup.enter)="submitForm()">
    ```
    ```typescript
    submitForm() { console.log('Form submitted'); }
    ```
  - **Keyup with Ref**:
    ```html
    <input #box (keyup)="onKey(box.value)">
    <p>{{ values }}</p>
    ```
    ```typescript
    values = '';
    onKey(value: string) { this.values += value + ' | '; }
    ```

**Best Practices**:
- Use specific events (e.g., `keyup.enter`) for precision.
- Type event parameters (e.g., `KeyboardEvent`, `Event`).
- Use template references (`#box`) for direct DOM access.
- Avoid inline logic; move to component methods.

## Component Communication
Components communicate in parent-child hierarchies or via services.

- **Parent to Child (@Input)**:
  ```typescript
  // Child
  import { Input } from '@angular/core';
  @Component({ selector: 'app-child' })
  export class ChildComponent {
    @Input() data: string;
  }
  ```
  ```html
  <!-- Parent -->
  <app-child [data]="parentData"></app-child>
  ```
  ```typescript
  // Parent
  parentData = 'Hello from parent';
  ```
- **Child to Parent (@Output)**:
  ```typescript
  // Child
  import { Output, EventEmitter } from '@angular/core';
  @Component({ selector: 'app-child' })
  export class ChildComponent {
    @Output() event = new EventEmitter<string>();
    emitEvent() { this.event.emit('Data from child'); }
  }
  ```
  ```html
  <!-- Parent -->
  <app-child (event)="handleEvent($event)"></app-child>
  ```
  ```typescript
  // Parent
  handleEvent(data: string) { console.log(data); }
  ```
- **ViewChild**:
  ```typescript
  // Parent
  import { ViewChild, AfterViewInit } from '@angular/core';
  import { ChildComponent } from './child.component';
  @Component({...})
  export class ParentComponent implements AfterViewInit {
    @ViewChild(ChildComponent) child: ChildComponent;
    ngAfterViewInit() { this.child.someMethod(); }
  }
  ```
- **Service-Based Communication**:
  ```typescript
  @Injectable({ providedIn: 'root' })
  export class SharedService {
    private subject = new BehaviorSubject<string>('Initial');
    data$ = this.subject.asObservable();
    updateData(data: string) { this.subject.next(data); }
  }
  ```
  ```typescript
  // Component
  constructor(private sharedService: SharedService) {
    this.sharedService.data$.subscribe(data => console.log(data));
  }
  ```

**Best Practices**:
- Use `@Input` for simple data passing.
- Prefer `@Output` for event-driven communication.
- Use `ViewChild` for direct access, but sparingly.
- Leverage services with RxJS for complex, cross-component communication.

## Modules
Modules group related components, directives, pipes, and services.

- **Root Module**:
  ```typescript
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppComponent } from './app.component';
  import { AppRoutingModule } from './app-routing.module';

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
  ```
- **Feature Module**:
  ```typescript
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HomeComponent } from './home.component';

  @NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule],
    exports: [HomeComponent]
  })
  export class HomeModule {}
  ```
- **Lazy Loading**:
  ```typescript
  const routes: Routes = [
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
  ];
  ```

**Best Practices**:
- Create feature modules for logical separation (e.g., `UserModule`, `ProductModule`).
- Use `CommonModule` in feature modules instead of `BrowserModule`.
- Lazy-load non-critical modules to reduce initial load time.
- Export shared components/directives for reuse.

## Services and Dependency Injection
Services encapsulate shared logic; dependency injection (DI) provides instances.

- **Service Example**:
  ```typescript
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({ providedIn: 'root' })
  export class DataService {
    constructor(private http: HttpClient) {}
    getData(): Observable<any> {
      return this.http.get('https://api.example.com/data');
    }
  }
  ```
- **Usage**:
  ```typescript
  @Component({...})
  export class AppComponent {
    constructor(private dataService: DataService) {
      this.dataService.getData().subscribe(data => console.log(data));
    }
  }
  ```
- **Custom Providers**:
  ```typescript
  @NgModule({
    providers: [{ provide: 'API_URL', useValue: 'https://api.example.com' }]
  })
  export class AppModule {}
  ```
  ```typescript
  constructor(@Inject('API_URL') private apiUrl: string) {}
  ```

**Best Practices**:
- Use `providedIn: 'root'` for singleton services.
- Inject services for HTTP, logging, or state management.
- Avoid circular dependencies by structuring services carefully.
- Use injection tokens for configuration values.

## Routing
Routing manages navigation in SPAs.

- **Basic Setup**:
  ```typescript
  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './home.component';
  import { NotFoundComponent } from './not-found.component';

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  ```
- **Template**:
  ```html
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/about">About</a>
  </nav>
  <router-outlet></router-outlet>
  ```
- **Route Guards**:
  ```typescript
  import { CanActivateFn } from '@angular/router';
  export const authGuard: CanActivateFn = (route, state) => {
    return !!localStorage.getItem('token'); // Example
  };
  ```
  ```typescript
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
  ```

**Best Practices**:
- Use descriptive route paths.
- Implement guards for authentication/authorization.
- Lazy-load feature modules for performance.
- Handle 404s with wildcard routes (`**`).

## Lifecycle Hooks
Components have eight lifecycle hooks for managing initialization, updates, and cleanup.

- **Hooks**:
  - `ngOnChanges`: Called when `@Input` properties change.
  - `ngOnInit`: After first render, ideal for initialization.
  - `ngDoCheck`: Custom change detection (use sparingly).
  - `ngAfterContentInit`: After content projection (`<ng-content>`).
  - `ngAfterContentChecked`: After content checked.
  - `ngAfterViewInit`: After view and child views initialized.
  - `ngAfterViewChecked`: After view checked.
  - `ngOnDestroy`: Before component destruction, for cleanup.
- **Example**:
  ```typescript
  import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

  @Component({...})
  export class AppComponent implements OnInit, OnDestroy, OnChanges {
    @Input() data: string;
    ngOnChanges(changes: SimpleChanges) { console.log('Input changed:', changes); }
    ngOnInit() { console.log('Component initialized'); }
    ngOnDestroy() { console.log('Component destroyed'); }
  }
  ```

**Best Practices**:
- Use `ngOnInit` for API calls or setup.
- Clean up subscriptions/timers in `ngOnDestroy`.
- Avoid heavy logic in `ngDoCheck` to prevent performance issues.
- Use `ngOnChanges` for reacting to input changes.

## Reactive Programming with RxJS
Angular integrates RxJS for handling asynchronous operations like HTTP requests or streams.

- **Example (HTTP)**:
  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({ providedIn: 'root' })
  export class ApiService {
    constructor(private http: HttpClient) {}
    getData(): Observable<any> {
      return this.http.get('https://api.example.com/data');
    }
  }
  ```
- **Subscription**:
  ```typescript
  @Component({...})
  export class AppComponent {
    constructor(private apiService: ApiService) {
      this.apiService.getData().subscribe({
        next: data => console.log(data),
        error: err => console.error(err),
        complete: () => console.log('Done')
      });
    }
  }
  ```
- **Async Pipe**:
  ```html
  <div *ngIf="data$ | async as data">{{ data.name }}</div>
  ```
  ```typescript
  data$: Observable<any>;
  constructor(private apiService: ApiService) {
    this.data$ = this.apiService.getData();
  }
  ```
- **Common Operators**:
  - `map`: Transform data.
  - `filter`: Filter emissions.
  - `switchMap`: Switch to new observable.
  - `debounceTime`: Delay emissions.

**Best Practices**:
- Use `async` pipe to auto-manage subscriptions in templates.
- Unsubscribe from manual subscriptions in `ngOnDestroy`.
- Chain operators for complex data transformations.
- Handle errors explicitly in subscriptions.

## Forms
Angular supports template-driven and reactive forms for user input.

- **Template-Driven Forms**:
  ```html
  <form #myForm="ngForm" (ngSubmit)="onSubmit()">
    <input name="username" ngModel required>
    <button type="submit" [disabled]="!myForm.valid">Submit</button>
  </form>
  ```
  ```typescript
  onSubmit() { console.log('Form submitted'); }
  ```
  Requires `FormsModule`.
- **Reactive Forms**:
  ```typescript
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';

  @Component({...})
  export class FormComponent {
    form: FormGroup;
    constructor(fb: FormBuilder) {
      this.form = fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
    onSubmit() {
      if (this.form.valid) { console.log(this.form.value); }
    }
  }
  ```
  ```html
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <input formControlName="username">
    <input formControlName="email">
    <button type="submit" [disabled]="form.invalid">Submit</button>
  </form>
  ```
  Requires `ReactiveFormsModule`.
- **Custom Validator**:
  ```typescript
  function forbiddenNameValidator(name: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === name ? { forbiddenName: { value: control.value } } : null;
    };
  }
  ```

**Best Practices**:
- Use reactive forms for complex, dynamic forms.
- Apply validators for robust input validation.
- Use form groups for nested structures.
- Handle form submission with observables for async processing.

## Pipes
Pipes transform data in templates for display.

- **Built-in Pipes**:
  - `date`: Format dates (e.g., `{{ today | date:'fullDate' }}`).
  - `uppercase`/`lowercase`: Change case.
  - `currency`: Format numbers as currency.
  - `json`: Display objects as JSON.
  - `async`: Unwrap observables.
- **Custom Pipe**:
  ```typescript
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({ name: 'reverse' })
  export class ReversePipe implements PipeTransform {
    transform(value: string): string {
      return value.split('').reverse().join('');
    }
  }
  ```
  ```html
  <p>{{ 'hello' | reverse }}</p> <!-- Outputs: olleh -->
  ```
- **Pure vs. Impure Pipes**:
  - Pure: Only re-evaluate when input changes (default).
  - Impure: Re-evaluate on every change detection cycle (`pure: false`).

**Best Practices**:
- Use pure pipes for performance.
- Create custom pipes for reusable transformations.
- Chain pipes for complex formatting (e.g., `{{ value | uppercase | slice:0:3 }}`).
- Avoid side effects in pipes.

## Testing
Angular CLI generates test files (`.spec.ts`) using Jasmine and Karma.

- **Run Tests**:
  ```bash
  ng test
  ```
- **Unit Test Example**:
  ```typescript
  import { TestBed } from '@angular/core/testing';
  import { AppComponent } from './app.component';

  describe('AppComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AppComponent]
      }).compileComponents();
    });

    it('should create the component', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should have title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      expect(component.title).toEqual('My App');
    });
  });
  ```
- **Mocking Services**:
  ```typescript
  TestBed.configureTestingModule({
    providers: [{ provide: DataService, useValue: { getData: () => of(['mock']) } }]
  });
  ```

**Best Practices**:
- Write tests for components, services, and pipes.
- Mock dependencies for isolated testing.
- Use `async`/`fakeAsync` for testing observables.
- Aim for high test coverage.

## Signals (Angular 20+)
Signals are a reactive state management system introduced in Angular 20.

- **Example**:
  ```typescript
  import { signal, computed, effect } from '@angular/core';

  @Component({...})
  export class SignalComponent {
    count = signal(0);
    double = computed(() => this.count() * 2);
    constructor() {
      effect(() => console.log(`Count changed to ${this.count()}`));
    }
    increment() { this.count.update(value => value + 1); }
  }
  ```
  ```html
  <p>Count: {{ count() }}</p>
  <p>Double: {{ double() }}</p>
  <button (click)="increment()">Increment</button>
  ```

**Best Practices**:
- Use signals for fine-grained reactivity.
- Combine with `computed` for derived state.
- Use `effect` for side effects (e.g., logging, API calls).
- Prefer signals over RxJS for simple state management.

## Performance Optimization
- **Lazy Loading**: Load feature modules on demand.
- **Change Detection**:
  - Use `OnPush` strategy:
    ```typescript
    @Component({ changeDetection: ChangeDetectionStrategy.OnPush })
    ```
  - Use zoneless architecture (`--zoneless`).
- **TrackBy in Loops**:
  ```typescript
  trackByFn(index: number, item: any) { return item.id; }
  ```
  ```html
  @for (item of items; track item.id) { ... }
  ```
- **Tree Shaking**: Ensure unused code is removed during build.
- **AOT Compilation**: Use `ng build --aot` for faster rendering.

**Best Practices**:
- Minimize change detection cycles with `OnPush`.
- Use lazy loading for large apps.
- Profile performance with Chrome DevTools.

## Summary/Cheat Sheet
- **CLI Commands**:
  - `ng new my-app [--options]`: Create app.
  - `ng g c component [--flat|--inline-template|--skip-tests]`: Generate component.
  - `ng serve`: Run dev server.
  - `ng build --aot`: Build production.
  - `ng test`: Run tests.
  - `ng update`: Update dependencies.
- **Data Binding**:
  - Interpolation: `{{ value }}`
  - Property: `[prop]="value"`
  - Event: `(event)="handler()"`
  - Two-way: `[(ngModel)]="value"`
- **Control Flow**:
  - `@if (condition) { ... } @else { ... }`
  - `@for (item of items; track item.id) { ... }`
  - `@switch (value) { @case (x) { ... } }`
- **Component Communication**:
  - `@Input`: Parent to child.
  - `@Output/EventEmitter`: Child to parent.
  - `@ViewChild`: Direct child access.
  - Service with RxJS: Cross-component.
- **Lifecycle Hooks**:
  - `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`, `ngAfterContentChecked`, `ngAfterViewInit`, `ngAfterViewChecked`, `ngOnDestroy`.
- **Best Practices**:
  - Modularize with feature modules and lazy loading.
  - Use reactive forms for complex inputs.
  - Optimize with signals, `OnPush`, and trackBy.
  - Clean up subscriptions in `ngOnDestroy`.
  - Write unit tests for critical functionality.