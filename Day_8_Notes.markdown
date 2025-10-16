# TypeScript Notes

## Installation and Setup Commands

- Install TypeScript globally: `npm i -g typescript`
- Install ts-loader as a dev dependency: `npm i --save-dev ts-loader`
- Update webpack configuration: Change `webpack.config.js` (specific changes not detailed, typically to handle TypeScript files).
- Compile a TypeScript file: `tsc tsfile.ts`
- Run the compiled JavaScript: `node tsfile.js`
- Install Yeoman generator for TypeScript projects: `npm i -g yo generator-tsproject`
- Create a project using Yeoman:
  - Command: `yo tsproject my-app`
  - Options:
    - Add nodemon? No
    - Package manager: npm
    - Install Jest for testing? No
    - Add Docker config? No
    - Use GitHub Actions for CI? No

## What is TypeScript?

- TypeScript is a syntactic superset of JavaScript.
- It is a strongly typed superset that compiles into JavaScript.
- Developed by Microsoft.
- Extends JavaScript by adding optional static typing and other features.
- Enhances code quality and developer experience, especially in large-scale applications.

## Why Use TypeScript?

- JavaScript is a loosely typed language.
- It can be difficult to understand the types of data being passed around in JavaScript.
- In JavaScript, function parameters and variables lack type information.
- Developers often need to refer to documentation to understand types.
- TypeScript addresses these issues by providing type safety and better predictability.

## Features of TypeScript

- Cross-platform compatibility.
- Supports Object-Oriented Programming (OOP) concepts.
- Optional static typing.
- Includes ES6 features.
- DOM manipulation capabilities.
- Static type checking.

## Comparison: JavaScript vs TypeScript

| Feature              | JavaScript (JS)                          | TypeScript (TS)                                      |
|----------------------|------------------------------------------|------------------------------------------------------|
| Language Type       | Interpreted                              | Compiled                                             |
| Compilation         | Not transpiled, runs as-is               | Transpiled to JavaScript                             |
| Error Detection     | Errors appear during runtime             | Errors caught during development (compile-time)      |
| Learning Curve      | Lower                                    | Higher                                               |
| Code Amount         | Less code                                | More code (due to types, interfaces, etc.)           |
| Code Predictability | Unpredictable behavior in some cases     | Predictable due to static typing                     |
| Versatility         | Remarkable versatility                   | Also versatile, with added structure                 |
| Platform Support    | Platform independent                     | Platform independent (compiled to JS)                |
| Programming Style   | Event-based programming supported        | Same as JS, with added type safety                   |
| ECMAScript Features | Uses ECMAScript features                 | Fully supports ECMAScript + more features            |
| Package Support     | Uses existing packages                   | Can use JS packages and has its own typings           |
| Editor Support      | Good support                             | Excellent support with advanced IntelliSense         |

## Execution of TypeScript

TypeScript is a superset of JavaScript, so all valid JavaScript code is also valid TypeScript. Before execution, TypeScript must be transpiled to JavaScript using the TypeScript compiler (tsc).

Steps:
1. Install TypeScript globally: `npm install -g typescript`
2. Check TypeScript version: `tsc --version`
3. Create a new directory: `mkdir HelloWorld`
4. Navigate into the directory: `cd HelloWorld`
5. Open the project in VS Code: `code .`
6. Create a file named `helloworld.ts` with code:
   ```
   let message: string = 'Hello World';
   console.log(message);
   ```
7. Compile the TypeScript file: `tsc ./helloworld.ts`
8. Run the compiled JavaScript: `node helloworld.js`

- Additional notes: Compiling multiple files into a single JS file is possible (e.g., using `tsc` with `--outFile` or module bundlers like Webpack).

## JavaScript and TypeScript Primitives

- Overview: Primitives are the most basic types and form the building blocks of more complex types. TypeScript includes all JavaScript primitives plus additional type features for improved safety.
- JavaScript Primitives: number, string, boolean, undefined, null, symbol, bigint.
- TypeScript Additions: Type annotations, void, any, never, unknown, tuple, enum, etc.
- All primitives are immutable.

## Built-in Data Types in TypeScript

| Data Type   | Keyword    | Description                                      |
|-------------|------------|--------------------------------------------------|
| Number     | number    | Represents both integers and floating-point numbers. |
| String     | string    | Represents a sequence of characters (text).      |
| Boolean    | boolean   | Represents a logical value: true or false.       |
| Void       | void      | For functions that do not return a value.        |
| Undefined  | undefined | For variables declared but not initialized.      |
| Null       | null      | Represents the intentional absence of any object value. |

## Type Examples

- Number: `let age: number = 30; let price: number = 19.99;`
- String: `let myName: string = "Alice"; let message: string = `Hello, ${myName}!`;` (Uses template strings).
- Boolean: `let isActive: boolean = true;`
- Array:
  - `let numbers: number[] = [1, 2, 3];`
  - `let names: Array<string> = ["Alice", "Bob"];`
- Tuple: `let user: [string, number] = ["Alice", 30];`
- Enum:
  ```
  enum Color {
    Red,
    Green,
    Blue
  }
  let c: Color = Color.Green;
  ```
- Object: `let person: { name: string; age: number } = { name: "Alice", age: 30 };`
- Any: `let v: any = true; v = "string"; Math.round(v);` (Use with caution as it bypasses type checking).

## Type: Never

- Used for functions that never successfully return, such as those that always throw an error or have infinite loops.
- Helps TypeScript catch unreachable code or improper returns.
- Example:
  ```
  /**
   * A function that never returns by always throwing an error.
   * 
   * @param message - The error message to throw
   * @throws Error
   */
  function throwError(message: string): never {
    throw new Error(message);
  }
  ```

## undefined vs null in TypeScript

- **undefined**:
  - Means a variable has been declared but not assigned a value.
  - Default value of uninitialized variables.
  - Dedicated type: `let y: undefined = undefined;`
- **null**:
  - Explicit assignment representing "no value" or "empty".
  - Intentional absence of value.
  - Dedicated type: `let z: null = null;`
- **strictNullChecks**:
  - When enabled, null and undefined are not assignable to other types unless explicitly allowed (e.g., union types).
  - Error example: `let a: string = null;` (invalid).
  - Correct: `let b: string | null = null;`
- Summary Table:
  | Concept    | Description                              | TypeScript Type |
  |------------|------------------------------------------|-----------------|
  | undefined | Variable declared but not assigned       | undefined      |
  | null      | Explicitly assigned to indicate "no value" | null           |

## Array of Objects

- Example using interface:
  ```
  interface User {
    id: number;
    name: string;
  }
  let users: User[] = [
    { id: 1, name: "Charlie" },
    { id: 2, name: "Diana" }
  ];
  ```

## Import and Export

- Used for modular code organization in TypeScript.
- Allows sharing code between files.
- Compiles to JavaScript modules.
- Example for simple calculator logic:
  - In `calculator.ts` (export):
    ```
    export function add(a: number, b: number): number {
      return a + b;
    }
    export function subtract(a: number, b: number): number {
      return a - b;
    }
    ```
  - In `main.ts` (import and use):
    ```
    import { add, subtract } from './calculator';
    console.log(add(5, 3)); // 8
    console.log(subtract(5, 3)); // 2
    ```

## Functions

- **Function Return Type**: Specifies what the function returns (e.g., `: string`).
- **Function in Object**: Functions can be properties of objects (methods).
- **Function Type**: Define types for functions, e.g., `type Logger = (message: string) => void;`
- **Declare a Function**:
  ```
  function greet(name: string): string {
    return `Hello, ${name}!`;
  }
  ```
- **Function Signature**:
  - Example 1:
    ```
    type Logger = (message: string) => void;
    const log: Logger = (msg) => console.log(msg);
    log("Logger Message");
    ```
  - Example 2 (pattern):
    ```
    type Pattern = (symb: string) => void;
    const pat: Pattern = (symb) => console.log(`${symb}`.repeat(50));
    pat("*");
    pat("$");
    pat("#");
    ```
  - Example 3 (with parameters):
    ```
    type Pattern = (symb: string, times: number) => void;
    const pat: Pattern = (symb, times) => console.log(`${symb}`.repeat(times));
    pat("*", 50);
    pat("$", 30);
    pat("#", 60);
    ```
- **Optional Function Parameters**:
  ```
  function greetPerson(name: string, age?: number): string {
    return age ? `${name} is ${age} years old.` : `Hello, ${name}!`;
  }
  console.log(greetPerson("Bob")); // Hello, Bob!
  console.log(greetPerson("Alice", 30)); // Alice is 30 years old.
  ```
- **Function as Parameter**:
  ```
  function greeter(msg: string, fn: (a: string) => void): void {
    fn(msg);
  }
  function printToConsole(s: string): void {
    console.log(s);
  }
  greeter("hello", printToConsole);
  ```

## Arrays and Operations

- Declarations:
  - `let numbers: number[] = [1, 2, 3];`
  - `let strings: Array<string> = ["a", "b", "c"];` (Note: Corrected from original typo for strings as numbers).
  - Empty array: `let emptyArray: number[] = [];`
- Operations:
  - Push: `numbers.push(4);` // Adds to end, e.g., [1, 2, 3, 4]
  - Includes: `numbers.includes(2);` // true if exists
  - Map: `let squares = numbers.map((x) => x * x);` // [1, 4, 9, 16]
  - Splice: `numbers.splice(2, 1);` // Removes 1 element at index 2
  - Sort: `numbers.sort((a, b) => a - b);` // Ascending sort
  - Find: `let found = numbers.find((x) => x > 1);` // Returns first match (e.g., 2)
  - Filter: `let even = numbers.filter((x) => x % 2 === 0);` // [2, 4]
  - Fill: `let zeroes = new Array(5).fill(0);` // [0, 0, 0, 0, 0]
  - ForEach: `numbers.forEach((number) => console.log(number));` // Logs each element
  - Length: `let length = numbers.length;` // e.g., 4

## Practical Example: Array of 10 Employees with CRUD Operations

- Interface for Employee:
  ```
  interface Employee {
    id: number;
    name: string;
    position: string;
  }
  ```
- Create array of 10 employees:
  ```
  let employees: Employee[] = [
    { id: 1, name: "Alice", position: "Developer" },
    { id: 2, name: "Bob", position: "Designer" },
    { id: 3, name: "Charlie", position: "Manager" },
    { id: 4, name: "Diana", position: "Tester" },
    { id: 5, name: "Eve", position: "Analyst" },
    { id: 6, name: "Frank", position: "Engineer" },
    { id: 7, name: "Grace", position: "HR" },
    { id: 8, name: "Hank", position: "Support" },
    { id: 9, name: "Ivy", position: "Sales" },
    { id: 10, name: "Jack", position: "Marketing" }
  ];
  ```
- CRUD Functions:
  - Create (Add):
    ```
    function addEmployee(employees: Employee[], newEmployee: Employee): void {
      employees.push(newEmployee);
    }
    // Usage: addEmployee(employees, { id: 11, name: "Karen", position: "Intern" });
    ```
  - Read (Get by ID):
    ```
    function getEmployeeById(employees: Employee[], id: number): Employee | undefined {
      return employees.find(emp => emp.id === id);
    }
    // Usage: console.log(getEmployeeById(employees, 1)); // Returns Alice's details
    ```
  - Update (By ID):
    ```
    function updateEmployee(employees: Employee[], id: number, updatedData: Partial<Employee>): boolean {
      const emp = employees.find(emp => emp.id === id);
      if (emp) {
        Object.assign(emp, updatedData);
        return true;
      }
      return false;
    }
    // Usage: updateEmployee(employees, 1, { name: "Alicia" }); // Updates name
    ```
  - Delete (By ID):
    ```
    function deleteEmployee(employees: Employee[], id: number): boolean {
      const index = employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        employees.splice(index, 1);
        return true;
      }
      return false;
    }
    // Usage: deleteEmployee(employees, 1); // Removes Alice
    ```
