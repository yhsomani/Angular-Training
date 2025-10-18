# Comprehensive TypeScript Notes

These notes provide a detailed, structured, and learner-friendly overview of TypeScript's core and advanced concepts. Designed for beginners, interview preparation, and quick reference, each section includes "What", "Why", "How", code examples, best practices, and common pitfalls. The content is cleaned up, reorganized, and enhanced to cover all essential TypeScript topics, including those requested and additional ones from the original notes.

## 1. Basic & Advanced Types

**What**: TypeScript extends JavaScript with static types, including primitives and complex structures like arrays, tuples, and objects.

**Why**: Ensures type safety, reduces runtime errors, and improves code maintainability and IDE support.

**How**:
- **Basic Types**: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- **Arrays**: `type[]` or `Array<type>`.
- **Tuples**: Fixed-length arrays with specific types, e.g., `[string, number]`.
- **Any**: Bypasses type checking (use sparingly).
- **Void**: For functions with no return value.
- **Never**: For functions that never return (e.g., throw errors or infinite loops).
- **Object**: Non-primitive types.
- **Unknown**: Safer alternative to `any`; requires type checking before use.

**Example**:
```typescript
let age: number = 30;
let name: string = "Alice";
let scores: number[] = [90, 85];
let tuple: [string, number] = ["Bob", 25];
function logError(): never { throw new Error("Error"); }
let unknownVar: unknown = "test"; // Must narrow type before use
if (typeof unknownVar === "string") { console.log(unknownVar.length); }
```

**Best Practices**:
- Prefer specific types over `any` or `unknown`.
- Use tuples for fixed-length, heterogeneous data.
- Avoid `any` to maintain type safety.

**Pitfalls**:
- Overusing `any` defeats TypeScript’s purpose.
- `unknown` requires explicit type checks, which can be verbose.

## 2. Type Inference

**What**: TypeScript infers types from assigned values without explicit declarations.

**Why**: Reduces boilerplate while preserving type safety.

**How**: TypeScript analyzes initial values to assign types. Explicit types override inference.

**Example**:
```typescript
let x = 10; // Inferred as number
x = "hello"; // Error: Type 'string' is not assignable to type 'number'
let arr = [1, 2, 3]; // Inferred as number[]
```

**Best Practices**:
- Rely on inference for simple assignments.
- Explicitly type complex or ambiguous cases (e.g., empty arrays: `let arr: number[] = [];`).

**Pitfalls**:
- Inference fails for ambiguous cases (e.g., `let arr = [];` infers `any[]`).
- Overriding inferred types can introduce errors if inconsistent.

## 3. Type Aliases vs Interfaces

**What**: Mechanisms to define custom types. Type aliases use `type`; interfaces use `interface`.

**Why**: Enables reusable, complex type definitions for better code organization.

**How**:
- **Type Aliases**: Flexible for primitives, unions, intersections, and complex types.
- **Interfaces**: Ideal for object shapes, support extension, and declaration merging.

**Example**:
```typescript
type ID = string | number; // Type alias for union
interface Person { name: string; age: number; }
interface Employee extends Person { role: string; } // Extension
type User = { name: string } & { id: number }; // Intersection
```

**Differences**:
- Interfaces: Extendable (`extends`), mergeable (reopen to add properties).
- Type Aliases: Better for unions, intersections, and primitives; no merging.

**Best Practices**:
- Use interfaces for object-oriented designs and public APIs.
- Use type aliases for unions, intersections, or utility types.
- Avoid deep interface hierarchies to maintain clarity.

**Pitfalls**:
- Declaration merging can lead to unintended type changes.
- Overusing extensions complicates type relationships.

## 4. Functions (Typing, Overloads, Optional/Default Params)

**What**: TypeScript allows typing function parameters, return values, and supports overloads, optional, and default parameters.

**Why**: Ensures functions are called correctly and catches errors during development.

**How**:
- **Typing**: Specify types for params and return.
- **Optional Parameters**: Use `?` (e.g., `param?: type`).
- **Default Parameters**: Assign default values (e.g., `param: type = value`).
- **Overloads**: Define multiple signatures for a single function.

**Example**:
```typescript
function greet(name: string, age?: number): string {
  return `Hello, ${name}${age ? ` (${age})` : ''}`;
}
function add(a: number, b: number): number; // Overload
function add(a: string, b: string): string;
function add(a: any, b: any): any { return a + b; }
function logItems(...items: string[]): void { console.log(items); } // Rest params
```

**Best Practices**:
- Use optional/default params for flexibility.
- Prefer unions over overloads when possible (simpler).
- Use rest parameters (`...args: type[]`) for variable arguments.

**Pitfalls**:
- Overloads can make code harder to maintain.
- Optional params must come after required ones.

## 5. Classes and OOP in TypeScript

**What**: TypeScript enhances ES6 classes with types, access modifiers (`public`, `private`, `protected`), abstract classes, and interfaces.

**Why**: Supports object-oriented programming with type safety for better structure.

**How**:
- Type properties, methods, and constructors.
- Use `implements` for interfaces, `extends` for inheritance.
- Access modifiers control visibility.

**Example**:
```typescript
interface AnimalInterface { move(): void; }
abstract class Animal {
  private name: string;
  constructor(name: string) { this.name = name; }
  protected move(distance: number): void { console.log(`Moved ${distance}m`); }
}
class Dog extends Animal implements AnimalInterface {
  constructor(name: string) { super(name); }
  bark() { console.log("Woof!"); }
  move() { super.move(10); }
}
const dog = new Dog("Buddy");
```

**Best Practices**:
- Use `readonly` for immutable properties.
- Leverage `abstract` for base classes that shouldn’t be instantiated.
- Keep access modifiers explicit.

**Pitfalls**:
- Forgetting `private` exposes internal state.
- Overusing inheritance can lead to tight coupling.

## 6. Generics

**What**: Reusable components with type parameters for flexibility.

**Why**: Enables type-safe reusable code without relying on `any`.

**How**: Use `<T>` to define generic types, optionally constrained with `extends`.

**Example**:
```typescript
function identity<T>(arg: T): T { return arg; }
let str = identity<string>("hello"); // Explicit type
let num = identity(42); // Inferred type
class GenericArray<T> {
  items: T[] = [];
  add(item: T) { this.items.push(item); }
}
const numArray = new GenericArray<number>();
numArray.add(1); // Works
// numArray.add("text"); // Error
```

**Best Practices**:
- Constrain generics (e.g., `<T extends { id: number }>`).
- Use descriptive type parameter names (e.g., `TKey` instead of `T`).

**Pitfalls**:
- Unconstrained generics behave like `any`.
- Overly complex generics reduce readability.

## 7. Enums

**What**: Named constants, either numeric or string-based.

**Why**: Replaces magic numbers/strings with readable identifiers.

**How**:
- Numeric enums: Auto-increment or custom values.
- String enums: Explicit string values.

**Example**:
```typescript
enum Direction { Up = 1, Down, Left, Right } // Numeric
enum Color { Red = "RED", Green = "GREEN" } // String
let dir: Direction = Direction.Up; // 1
let col: Color = Color.Red; // "RED"
```

**Best Practices**:
- Use string enums for clarity and debugging.
- Initialize numeric enums to avoid unexpected values.

**Pitfalls**:
- Numeric enums can accept any number if not strictly typed.
- Overusing enums for simple cases bloats code (consider literals).

## 8. Modules & Namespaces

**What**:
- **Modules**: File-based organization using `import`/`export`.
- **Namespaces**: Logical grouping within a file using `namespace`.

**Why**: Organizes code, prevents global scope pollution, and supports modularity.

**How**:
- Modules: Use ES6 syntax, configured via `tsconfig.json` (`module` option).
- Namespaces: Group related code with `namespace` keyword.

**Example**:
```typescript
// math.ts (Module)
export function add(a: number, b: number): number { return a + b; }
// main.ts
import { add } from './math';
console.log(add(2, 3)); // 5

// Namespace
namespace Geometry {
  export class Circle {
    constructor(public radius: number) {}
    calculateArea(): number { return Math.PI * this.radius ** 2; }
  }
}
const circle = new Geometry.Circle(5);
console.log(circle.calculateArea()); // ~78.54
```

**Differences**:
- Modules: File-based, support dependencies, modern standard.
- Namespaces: Internal grouping, older approach, less common.

**Best Practices**:
- Prefer modules for modern projects.
- Use `/// <reference path="file.ts" />` for namespace dependencies.
- Avoid deep namespace nesting.

**Pitfalls**:
- Namespaces don’t support module loaders natively.
- Mixing modules and namespaces causes confusion.

## 9. Type Assertions

**What**: Override TypeScript’s inferred type using `as` or `<type>` syntax.

**Why**: Useful when you know a type better than the compiler (e.g., DOM or JSON).

**How**: Assert a value to a specific type.

**Example**:
```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length; // Assertion
let elem = document.getElementById("id") as HTMLInputElement;
```

**Best Practices**:
- Use with type guards for safety (e.g., `if (typeof x === "string")`).
- Prefer `as` syntax over `<type>` for clarity.

**Pitfalls**:
- Incorrect assertions cause runtime errors.
- Overuse indicates poor typing elsewhere.

## 10. Utility Types

**What**: Built-in types like `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`.

**Why**: Transform existing types to avoid duplication.

**How**: Apply to interfaces or types.

**Example**:
```typescript
interface Todo { title: string; done: boolean; }
type PartialTodo = Partial<Todo>; // { title?: string; done?: boolean }
type RequiredTodo = Required<Todo>; // All required
type TodoKeys = Pick<Todo, "title">; // { title: string }
type NoDone = Omit<Todo, "done">; // { title: string }
```

**Best Practices**:
- Combine with generics for flexibility.
- Use `Record` for key-value mappings (e.g., `Record<string, number>`).

**Pitfalls**:
- Overusing utility types can obscure intent.
- Misapplying types (e.g., `Omit` with wrong keys) causes errors.

## 11. Type Narrowing & Guards

**What**: Refine types within code blocks using `typeof`, `instanceof`, or custom guards.

**Why**: Safely access properties based on runtime checks.

**How**:
- Use `typeof`, `instanceof`, or `in` operator.
- Define custom guards (e.g., `isType` functions).

**Example**:
```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") { // Narrowed to number
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value; // Narrowed to string
}
function isString(x: any): x is string { return typeof x === "string"; }
```

**Best Practices**:
- Create reusable type guards for complex types.
- Use `in` for object property checks (e.g., `if ("prop" in obj)`).

**Pitfalls**:
- Incomplete narrowing (e.g., missing `else`) causes errors.
- Overly complex guards reduce readability.

## 12. Advanced Types (Union, Intersection, Literal, keyof, typeof)

**What**: Complex type constructs for precise modeling.

**Why**: Enables flexible and accurate type definitions.

**How**:
- **Union**: `type | type` (e.g., `string | number`).
- **Intersection**: `type & type` (combines types).
- **Literal**: Specific values (e.g., `"success" | "error"`).
- **keyof**: Extracts keys of a type (e.g., `keyof T`).
- **typeof**: Infers type from a value.

**Example**:
```typescript
type Status = "loading" | "success" | "error"; // Literal
type User = { name: string } & { id: number }; // Intersection
let key: keyof { a: string; b: number } = "a"; // "a" | "b"
let obj = { x: 10 };
type ObjType = typeof obj; // { x: number }
```

**Best Practices**:
- Use literal types for finite states.
- Combine `keyof` with mapped types for dynamic access.
- Narrow unions with guards.

**Pitfalls**:
- Broad unions reduce type safety.
- Intersections of incompatible types result in `never`.

## 13. Declaration Files & Ambient Types

**What**: `.d.ts` files provide type definitions for JavaScript code.

**Why**: Enables type safety for untyped JavaScript or third-party libraries.

**How**: Use `declare` to define types without implementation.

**Example**:
```typescript
// my-lib.d.ts
declare module "my-lib" { export function doSomething(): void; }
// ambient.d.ts
declare const myGlobal: string;
```

**Using References**:
```typescript
/// <reference path="my-lib.d.ts" />
import { doSomething } from "my-lib";
```

**Best Practices**:
- Use `/// <reference path="..." />` for namespace dependencies.
- Generate `.d.ts` files for your own libraries (`declaration: true` in `tsconfig.json`).

**Pitfalls**:
- Outdated `.d.ts` files cause type mismatches.
- Missing declarations lead to `any` types.

## 14. Working with Third-Party JavaScript Libraries (e.g., DefinitelyTyped)

**What**: Use `@types/package` from DefinitelyTyped to add types to JavaScript libraries.

**Why**: Brings type safety to libraries like Lodash, React, or jQuery.

**How**: Install via npm (e.g., `npm install @types/lodash --save-dev`).

**Example**:
```typescript
import _ from "lodash";
const chunked = _.chunk([1, 2, 3, 4], 2); // Typed as number[][]
```

**Best Practices**:
- Check DefinitelyTyped for existing types.
- Create custom `.d.ts` files for untyped libraries.
- Use `types` or `typeRoots` in `tsconfig.json` to include custom types.

**Pitfalls**:
- Version mismatches between library and `@types` package.
- Missing types require manual declarations.

## 15. Decorators

**What**: Experimental feature to modify classes, methods, properties, or parameters using `@` syntax (requires `experimentalDecorators: true` in `tsconfig.json`).

**Why**: Adds metadata or behavior (e.g., logging, dependency injection in Angular).

**How**: Define functions for decoration, applied with `@`.

**Types**:
- **Class Decorator**: Modifies constructor.
- **Method Decorator**: Wraps method execution.
- **Property Decorator**: Alters property getters/setters.
- **Parameter Decorator**: Logs or validates parameters.
- **Accessor Decorator**: Modifies getters/setters.

**Example**:
```typescript
// Class Decorator
function Timestamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor { timestamp = new Date(); };
}
@Timestamp
class Message {
  constructor(public content: string) {}
}
const msg = new Message("Hello");
console.log(msg.timestamp); // Current timestamp

// Method Decorator
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}
class Calculator {
  @Log
  add(a: number, b: number) { return a + b; }
}
const calc = new Calculator();
calc.add(3, 7); // Logs: Calling add with [3, 7]

// Property Decorator
function Capitalize(target: any, key: string) {
  let value: string;
  Object.defineProperty(target, key, {
    get: () => value,
    set: (newVal: string) => { value = newVal.charAt(0).toUpperCase() + newVal.slice(1); },
  });
}
class Person {
  @Capitalize
  name: string = "";
}
const p = new Person();
p.name = "john"; // Sets to "John"
console.log(p.name); // John

// Parameter Decorator
function LogParam(target: any, key: string, index: number) {
  console.log(`Parameter at ${index} in ${key} logged`);
}
class UserService {
  createUser(@LogParam name: string) { console.log(`User ${name} created`); }
}
const service = new UserService();
service.createUser("Alice"); // Logs: Parameter at 0 in createUser logged
```

**Decorator Factory**:
```typescript
function Prefix(prefix: string) {
  return (target: any, key: string) => {
    let value: string;
    Object.defineProperty(target, key, {
      get: () => value,
      set: (newVal: string) => { value = `${prefix} ${newVal}`; },
    });
  };
}
class Book {
  @Prefix("Title:")
  name: string = "";
}
const b = new Book();
b.name = "TypeScript Guide"; // Sets to "Title: TypeScript Guide"
```

**Best Practices**:
- Use factories for configurable decorators.
- Combine with `emitDecoratorMetadata` for reflection.
- Test decorators thoroughly due to experimental status.

**Pitfalls**:
- Runtime side-effects can be hard to debug.
- Not standard JavaScript; may require polyfills or transpilation.

## 16. tsconfig.json Configuration

**What**: JSON file controlling TypeScript compiler options.

**Why**: Customizes compilation, enforces type safety, and configures output.

**Key Options**:
- `"target"`: Output JS version (e.g., `"es6"`).
- `"module"`: Module system (e.g., `"commonjs"`, `"esnext"`).
- `"strict"`: Enables strict type-checking (recommended).
- `"experimentalDecorators"`: Enables decorators.
- `"emitDecoratorMetadata"`: Adds metadata for decorators.
- `"outDir"`: Output directory (e.g., `"build"`).
- `"include"`: Files to compile (e.g., `["src/**/*.ts"]`).
- `"exclude"`: Files to ignore (e.g., `["node_modules"]`).

**Example**:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "outDir": "build",
    "sourceMap": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Best Practices**:
- Enable `strict` for maximum type safety.
- Use `sourceMap` for debugging.
- Specify `outDir` to keep source and output separate.

**Pitfalls**:
- Loose settings (e.g., disabling `strict`) reduce type safety.
- Incorrect module settings cause runtime issues.

## 17. Additional Best Practices and Tips

- **Type Safety**: Always prefer explicit types or inference over `any`.
- **Modularity**: Break code into small, reusable modules.
- **Consistency**: Use consistent naming (e.g., `T` for generics, `I` for interfaces).
- **Tooling**: Leverage IDEs (e.g., VSCode) for type hints and error detection.
- **Testing**: Write unit tests to verify type-related logic.
- **Documentation**: Comment complex types or decorators for clarity.
- **Version Control**: Keep `@types` packages in sync with library versions.

## 18. Common Interview Questions

1. **What’s the difference between `interface` and `type`?**
   - Interfaces: Extendable, mergeable, object-oriented.
   - Types: Flexible for unions, intersections, primitives.

2. **When would you use a type assertion?**
   - When you know a type (e.g., DOM element) better than TypeScript.

3. **How do generics improve code?**
   - Enable reusable, type-safe functions and classes.

4. **What are decorators, and how are they enabled?**
   - Metadata for classes/methods; enable with `experimentalDecorators`.

5. **How do you handle third-party JS libraries?**
   - Use `@types` packages or custom `.d.ts` files.

## 19. Practical Use Cases

- **Web Apps**: Use TypeScript with frameworks like Angular (decorators for components) or React (JSX typing).
- **API Clients**: Type API responses for safe data handling.
- **Libraries**: Write typed libraries with `.d.ts` files for community use.
- **Monorepos**: Use modules and `tsconfig.json` paths for shared types.
