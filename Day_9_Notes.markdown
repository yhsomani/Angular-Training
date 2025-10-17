# TypeScript Tuples: Structured Notes

## 1. TypeScript Tuples
A tuple is a fixed-size, ordered list of elements with specific types, allowing heterogeneous data types. Declared using square brackets `[]` with types in the expected order.

### 1.1 Tuple Declaration
- Define with specific types in fixed order: `let tupleName: [type1, type2, ..., typeN];`
- Example:
  ```typescript
  let myTuple: [string, number, boolean] = ["hello", 123, true];
  ```

### 1.2 Accessing Tuple Elements
- Access via 0-based index.
- Example:
  ```typescript
  let employee: [number, string] = [1, "Steve"];
  console.log(employee[0]); // 1
  console.log(employee[1]); // "Steve"
  ```

### 1.3 Heterogeneous Data Types in Tuples
- Store mixed types in one structure.
- Example:
  ```typescript
  let empTuple: [string, number, string] = ["Vivek", 22, "Honesty"];
  console.log("Name: " + empTuple[0]); // "Name: Vivek"
  console.log("Age: " + empTuple[1]);  // "Age: 22"
  console.log(empTuple[0] + " is known for " + empTuple[2]); // "Vivek is known for Honesty"
  ```

### 1.4 Operations on Tuples
#### 1.4.1 Push Operation
- Adds elements, but breaks type safety.
- Example:
  ```typescript
  let employee: [number, string] = [1, "Steve"];
  employee.push(2, "Bill"); // Unsafe
  console.log(employee); // [1, "Steve", 2, "Bill"]
  ```
- ⚠️ Warning: `push()` violates tuple type safety.

#### 1.4.2 Pop Operation
- Removes last element, reduces length.
- Example:
  ```typescript
  let empTuple: [string, number, string, number] = ["Mohit", 25, "TypeScript", 10001];
  empTuple.pop();
  console.log(empTuple.length); // 3
  console.log(empTuple); // ["Mohit", 25, "TypeScript"]
  ```

#### 1.4.3 Update or Modify Tuple Elements
- Modify by index with type-compatible values.
- Example:
  ```typescript
  let empTuple: [string, number, string] = ["Ganesh", 25, "TCS"];
  empTuple[1] = 60;
  console.log(empTuple); // ["Ganesh", 60, "TCS"]
  ```

#### 1.4.4 Clear Tuple Fields
- Clear using type assertion to empty array; unsafe.
- Example:
  ```typescript
  let empTuple: [string, number, string] = ["Rohit Sharma", 25, "typescript"];
  empTuple = [] as [string, number, string];
  console.log(empTuple); // []
  ```
- ⚠️ Caution: Clearing may cause runtime errors when accessing elements.

#### 1.4.5 Destructuring Tuples
- Assign elements to variables; partial destructuring allowed.
- Example:
  ```typescript
  let empTuple: [string, number, string] = ["Rohit Sharma", 25, "typescript"];
  let [name, age] = empTuple;
  console.log(name); // "Rohit Sharma"
  console.log(age);  // 25
  ```

#### 1.4.6 Passing Tuples to Functions
- Pass with matching tuple type or destructure.
- Example:
  ```typescript
  let empTuple: [string, number, string] = ["typescript", 101, "rajesh"];
  function display([skill, id, name]: [string, number, string]) {
      console.log(`Name: ${name}, ID: ${id}, Skill: ${skill}`);
  }
  display(empTuple); // "Name: rajesh, ID: 101, Skill: typescript"
  ```

### 1.5 Declaration and Initialization
- Initialize separately by assigning to indices.
- Example:
  ```typescript
  let arrTuple: [number, number, string] = [] as [number, number, string];
  arrTuple[0] = 501;
  arrTuple[1] = 506;
  arrTuple[2] = "hello";
  console.log(arrTuple); // [501, 506, "hello"]
  ```

### 1.6 Readonly Tuples
- Prevent modifications with `readonly`.
- Example:
  ```typescript
  let readonlyTuple: readonly [string, number] = ["Alice", 30];
  // readonlyTuple[1] = 31; // Error: Cannot assign
  ```

### 1.7 Common Issues and Fixes
- **Issue**: Incorrect syntax (e.g., `)` instead of `]`).
  - **Fix**: Use `[]` for declaration.
- **Issue**: Clearing tuples with `[]`.
  - **Fix**: Avoid accessing elements after clearing.
- **Issue**: Unsafe `push()`.
  - **Fix**: Use `readonly` tuples for safety.

### 1.8 Tuples Cheat Sheet
- **Declaration**: `let t: [string, number] = ["A", 10];`
- **Access**: `t[0]; // "A"`
- **Modify**: `t[1] = 20;`
- **Clear**: `t = [] as [string, number];` (unsafe)
- **Destructure**: `let [a, b] = t;`
- **Push**: `t.push("extra");` (unsafe)
- **Readonly**: `let t: readonly [string, number] = ["A", 10];`

---

# TypeScript Enums: Structured Notes

## 2. TypeScript Enums
Enums represent a group of constants, either numeric or string-based, for defining named values. They provide a way to organize related constants for better code readability and type safety.

### 2.1 Numeric Enums
- Default starts at 0, increments by 1.
- Can set custom starting values.
- Example:
  ```typescript
  enum CardinalDirections {
      North, // 0
      East,  // 1
      South, // 2
      West   // 3
  }
  let direction = CardinalDirections.North;
  console.log(direction); // 0
  console.log(CardinalDirections.West); // 3
  ```
- Custom start:
  ```typescript
  enum CardinalDirections {
      North = 1,
      East,  // 2
      South, // 3
      West   // 4
  }
  console.log(CardinalDirections.North); // 1
  console.log(CardinalDirections.West); // 4
  ```

### 2.2 String Enums
- Explicit string values for each member.
- Example:
  ```typescript
  enum CardinalDirections {
      North = "NORTH",
      East = "EAST",
      South = "SOUTH",
      West = "WEST"
  }
  let direction = CardinalDirections.North;
  console.log(direction); // "NORTH"
  ```

### 2.3 Key Points about Enums
- **Purpose**: Define related constants for clarity and type safety.
- **Numeric Enums**: Auto-increment from 0 or custom start; useful for indexing or flags.
- **String Enums**: Require explicit values; ideal for human-readable constants.
- **Usage**: Assign to variables, use in comparisons, or switch statements.
- Example:
  ```typescript
  enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
  let userStatus: Status = Status.Active;
  console.log(userStatus); // "ACTIVE"
  switch (userStatus) {
      case Status.Active:
          console.log("User is active"); // "User is active"
          break;
      case Status.Inactive:
          console.log("User is inactive");
          break;
  }
  ```

---

# TypeScript OOP Concepts: Structured Notes

## 3. TypeScript OOP Concepts

### 3.1 Classes
- Blueprint for objects with properties and methods.
- Example:
  ```typescript
  class Car {
      model: string;
      year: number;
      price: string;
      drive() {
          console.log('The Car has Started driving');
      }
      stop() {
          console.log('The car has stopped');
      }
  }
  const tesla = new Car();
  tesla.model = "Model X";
  tesla.year = 2022;
  tesla.price = "200000";
  tesla.drive(); // "The Car has Started driving"
  tesla.stop(); // "The car has stopped"
  ```

### 3.2 Constructor Functions
- Initialize object properties during creation.
- Example:
  ```typescript
  class Greeter {
      greeting: string;
      constructor(message: string) {
          this.greeting = message;
      }
      greet() {
          return "Hello, " + this.greeting;
      }
  }
  let greeter = new Greeter("world");
  console.log(greeter.greet()); // "Hello, world"
  ```

### 3.3 Generic Classes
- Classes with flexible types using generics.
- Example:
  ```typescript
  class Vehicle<Type> {
      contents: Type;
      constructor(value: Type) {
          this.contents = value;
      }
  }
  const car = new Vehicle("BMW"); // Vehicle<string>
  console.log(car.contents); // "BMW"
  const carList = new Vehicle(["BMW", "Audi"]); // Vehicle<string[]>
  ```

### 3.4 Getters and Setters
- Control property access with validation.
- Example:
  ```typescript
  class A {
      private _variable: string;
      constructor(variable: string) {
          this._variable = variable;
      }
      get variable(): string {
          return this._variable;
      }
      set variable(value: string) {
          if (value === '') throw new Error("Variable cannot be empty");
          this._variable = value;
      }
  }
  const obj = new A('string');
  obj.variable = 'different string';
  console.log(obj.variable); // "different string"
  ```

### 3.5 Optional Properties
- Properties marked with `?` are optional.
- Example:
  ```typescript
  interface Person {
      name?: string;
      age: number;
  }
  let person: Person = { age: 25 }; // Valid
  console.log(person); // { age: 25 }
  ```

### 3.6 Readonly Properties
- Cannot be modified after initialization.
- Example:
  ```typescript
  class Octopus {
      readonly name: string;
      readonly numberOfLegs: number = 8;
      constructor(theName: string) {
          this.name = theName;
      }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Other"; // Error: Cannot assign
  console.log(dad.name); // "Man with the 8 strong legs"
  ```

### 3.7 Parameter Properties
- Combine property declaration and constructor assignment.
- Example:
  ```typescript
  class Octopus {
      readonly numberOfLegs: number = 8;
      constructor(readonly name: string) {}
  }
  let dad = new Octopus("Man with the 8 strong legs");
  console.log(dad.name); // "Man with the 8 strong legs"
  ```

### 3.8 Encapsulation and Access Modifiers
- **Encapsulation**: Hide data, expose via methods.
- **Access Modifiers**:
  #### 3.8.1 Public
  - Accessible everywhere (default).
  #### 3.8.2 Private
  - Class-only access, not inherited.
  #### 3.8.3 Protected
  - Class and subclasses access.
  #### 3.8.4 Static
  - Class-level access, not on instances.
- Example:
  ```typescript
  class Animal {
      private name: string;
      constructor(theName: string) {
          this.name = theName;
      }
  }
  class Rhino extends Animal {
      constructor() {
          super("Rhino");
      }
  }
  let animal = new Animal("Goat");
  // console.log(animal.name); // Error: 'name' is private
  ```

### 3.9 Protected
- Accessible in class and subclasses.
- Example:
  ```typescript
  class Person {
      protected name: string;
      constructor(name: string) {
          this.name = name;
      }
  }
  class Employee extends Person {
      private department: string;
      constructor(name: string, department: string) {
          super(name);
          this.department = department;
      }
      getElevatorPitch() {
          return `Hello, my name is ${this.name} and I work in ${this.department}.`;
      }
  }
  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch()); // "Hello, my name is Howard and I work in Sales."
  ```

### 3.10 Static Properties and Methods
- Accessed directly on class, not instances.
- Example:
  ```typescript
  class Greeter {
      static standardGreeting = "Hello, there";
      greeting: string;
      greet() {
          return this.greeting ? `Hello, ${this.greeting}` : Greeter.standardGreeting;
      }
  }
  let greeter1 = new Greeter();
  console.log(greeter1.greet()); // "Hello, there"
  Greeter.standardGreeting = "Hey there!";
  let greeter2 = new Greeter();
  console.log(greeter2.greet()); // "Hey there!"
  ```

### 3.11 Inheritance
- Child classes inherit from parent using `extends`.
- Example:
  ```typescript
  class Person {
      name: string;
      age: number;
      constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
      }
      speak() {
          console.log(`My name is ${this.name}, I am ${this.age} years old`);
      }
  }
  class Chef extends Person {
      occupation: string;
      constructor(name: string, age: number, occupation: string) {
          super(name, age);
          this.occupation = occupation;
      }
      speak() {
          console.log(`I am a ${this.occupation}`);
      }
  }
  ```

### 3.12 Extends vs. Implements
- **Extends**: Inherit class properties/methods.
- **Implements**: Adhere to interface contract.
- Example:
  ```typescript
  interface Market {
      showPrice(): void;
  }
  class Car implements Market {
      price = 100;
      showPrice() {
          console.log(this.price);
      }
  }
  const instance = new Car();
  instance.showPrice(); // 100
  ```

### 3.13 Overriding and Extending Inherited Properties
- Override parent methods; use `super` to extend.
- Example:
  ```typescript
  class A {
      print() {
          console.log('I am class A');
      }
  }
  class B extends A {
      print() {
          super.print();
          console.log('I am class B');
      }
  }
  const obj = new B();
  obj.print(); // "I am class A", "I am class B"
  ```

### 3.14 Abstract Classes
- Cannot be instantiated; define abstract methods.
- Example:
  ```typescript
  abstract class Car {
      abstract printCarName(): void;
  }
  class BMW extends Car {
      printCarName() {
          console.log("BMW");
      }
  }
  const bmw = new BMW();
  bmw.printCarName(); // "BMW"
  ```

### 3.15 Index Signatures
- Define types for dynamic property names.
  #### 3.15.1 General Index Signature
  - Example:
    ```typescript
    interface Inventory {
        [itemName: string]: number;
    }
    const storeInventory: Inventory = {
        apples: 50,
        bananas: 30,
    };
    console.log(storeInventory.bananas); // 30
    ```
  #### 3.15.2 Union Type for Keys
  - Example:
    ```typescript
    type Statuses = "active" | "inactive" | "pending";
    interface StatusMap {
        [key in Statuses]: boolean;
    }
    const userStatus: StatusMap = {
        active: true,
        inactive: false,
        pending: true,
    };
    console.log(userStatus.pending); // true
    ```
  #### 3.15.3 Dynamic User Ages
  - Example:
    ```typescript
    interface UserAges {
        [name: string]: number;
    }
    const userAges: UserAges = {
        Alice: 30,
        Bob: 25,
    };
    console.log(userAges.Bob); // 25
    ```

### 3.16 Discriminated Unions (Shape Types)
- Combine types with a common discriminator.
- Example:
  ```typescript
  interface Circle {
      kind: "circle";
      radius: number;
  }
  interface Square {
      kind: "square";
      sideLength: number;
  }
  type Shape = Circle | Square;
  function getArea(shape: Shape): number {
      if (shape.kind === "circle") {
          return Math.PI * shape.radius ** 2;
      }
      return shape.sideLength ** 2;
  }
  const circle: Shape = { kind: "circle", radius: 5 };
  console.log(getArea(circle)); // ~78.54
  ```

### 3.17 Generic Interfaces
- Flexible, type-safe interfaces.
- Example:
  ```typescript
  interface Item<T> {
      value: T;
  }
  const stringItem: Item<string> = { value: "Item" };
  console.log(stringItem.value); // "Item"
  ```

### 3.18 Encapsulation and Reusable Object Structures
- **Encapsulation**: Hide data with `private`/`protected`, expose via methods.
- **Reusable Objects**: Modularity via encapsulation, extensibility via inheritance/interfaces.
- Example:
  ```typescript
  class BankAccount {
      private _balance: number;
      constructor(initialBalance: number) {
          this._balance = initialBalance;
      }
      get balance(): number {
          return this._balance;
      }
      deposit(amount: number) {
          this._balance += amount;
      }
  }
  let account = new BankAccount(1000);
  account.deposit(500);
  console.log(account.balance); // 1500
  ```

  ---

  # Core OOP Pillars: Structured Notes

## 4. Core OOP Pillars

### 4.1 Encapsulation
- **Definition**: Hides internal data (attributes) and exposes controlled access via methods (e.g., getters/setters).
- **Purpose**: Protects data integrity and promotes modularity.
- **Implementation**: Use `private` or `protected` access modifiers.
- **Example**:
  ```typescript
  class BankAccount {
      private _balance: number;
      constructor(initialBalance: number) {
          this._balance = initialBalance;
      }
      get balance(): number {
          return this._balance;
      }
      deposit(amount: number) {
          if (amount > 0) this._balance += amount;
      }
  }
  let account = new BankAccount(1000);
  account.deposit(500);
  console.log(account.balance); // 1500
  // console.log(account._balance); // Error: '_balance' is private
  ```

### 4.2 Inheritance
- **Definition**: Allows a class to inherit properties and methods from a parent class.
- **Purpose**: Promotes code reuse and establishes a hierarchy.
- **Implementation**: Use `extends` keyword and `super` to call parent constructor/methods.
- **Example**:
  ```typescript
  class Person {
      constructor(public name: string) {}
      speak() {
          console.log(`${this.name} is speaking`);
      }
  }
  class Chef extends Person {
      constructor(name: string, public occupation: string) {
          super(name);
      }
      cook() {
          console.log(`${this.name} is cooking`);
      }
  }
  let chef = new Chef("Alice", "Chef");
  chef.speak(); // "Alice is speaking"
  chef.cook(); // "Alice is cooking"
  ```

### 4.3 Polymorphism
- **Definition**: Enables objects to be treated as instances of their parent class, with different behaviors based on the actual type.
- **Types**: Method overloading and method overriding.
- **Purpose**: Increases flexibility and reusability.

#### 4.3.1 Method Overloading
- **Definition**: Multiple methods with the same name but different parameter lists (number or types).
- **Purpose**: Allows varied input handling.
- **Example**:
  ```typescript
  class Calculator {
      add(a: number, b: number): number;
      add(a: string, b: string): string;
      add(a: any, b: any): any {
          if (typeof a === "string") return a + b;
          return a + b;
      }
  }
  let calc = new Calculator();
  console.log(calc.add(1, 2)); // 3
  console.log(calc.add("Hello", "World")); // "HelloWorld"
  ```

#### 4.3.2 Method Overriding
- **Definition**: Child class redefines a parent class method.
- **Purpose**: Customizes behavior for specific subclasses.
- **Example**:
  ```typescript
  class Animal {
      makeSound() {
          console.log("Generic animal sound");
      }
  }
  class Dog extends Animal {
      makeSound() {
          console.log("Woof!");
      }
  }
  let dog = new Dog();
  dog.makeSound(); // "Woof!"
  ```

### 4.4 Abstraction
- **Definition**: Hides complex implementation details, exposing only relevant features.
- **Purpose**: Simplifies interaction with complex systems.
- **Implementation**: Use abstract classes or interfaces.
- **Example**:
  ```typescript
  abstract class Shape {
      abstract area(): number;
  }
  class Circle extends Shape {
      constructor(public radius: number) {
          super();
      }
      area() {
          return Math.PI * this.radius ** 2;
      }
  }
  let circle = new Circle(5);
  console.log(circle.area()); // ~78.54
  ```

  ---

  # Additional OOP Concepts: Structured Notes

## 5. Additional OOP Concepts

### 5.1 Constructor
- **Definition**: Special method called automatically during object creation to initialize properties.
- **Purpose**: Sets up initial state of an object.
- **Example**:
  ```typescript
  class Person {
      constructor(public name: string) {
          console.log("Constructor called");
      }
  }
  let person = new Person("Alice"); // "Constructor called"
  console.log(person.name); // "Alice"
  ```

### 5.2 Explicit vs. Implicit Calling
- **Explicit Calling**: Manually invoking methods (e.g., `obj.method()`).
- **Implicit Calling**: Automatic invocation (e.g., constructor during object creation).
- **Example**:
  ```typescript
  class Person {
      constructor(public name: string) {
          console.log("Constructor called"); // Implicit
      }
      greet() {
          console.log(`Hello, ${this.name}`); // Explicit
      }
  }
  let person = new Person("Alice"); // Implicit: "Constructor called"
  person.greet(); // Explicit: "Hello, Alice"
  ```

### 5.3 toString Method
- **Definition**: Returns a string representation of an object, often overridden for custom output.
- **Purpose**: Provides a human-readable description of the object.
- **Example**:
  ```typescript
  class Person {
      constructor(public name: string) {}
      toString() {
          return `Person: ${this.name}`;
      }
  }
  let person = new Person("Alice");
  console.log(person.toString()); // "Person: Alice"
  ```

### 5.4 Access Modifiers
- **Definition**: Keywords that control the accessibility of class properties and methods.

#### 5.4.1 Public
- **Definition**: Accessible everywhere (default).
- **Example**:
  ```typescript
  class Person {
      public name: string;
      constructor(name: string) {
          this.name = name;
      }
  }
  let person = new Person("Alice");
  console.log(person.name); // "Alice"
  ```

#### 5.4.2 Private
- **Definition**: Accessible only within the class, not inherited.
- **Example**:
  ```typescript
  class Person {
      private name: string;
      constructor(name: string) {
          this.name = name;
      }
      getName() {
          return this.name;
      }
  }
  let person = new Person("Alice");
  // console.log(person.name); // Error: 'name' is private
  console.log(person.getName()); // "Alice"
  ```

#### 5.4.3 Protected
- **Definition**: Accessible within the class and its subclasses.
- **Example**:
  ```typescript
  class Person {
      protected name: string;
      constructor(name: string) {
          this.name = name;
      }
  }
  class Employee extends Person {
      constructor(name: string, public department: string) {
          super(name);
      }
      getInfo() {
          return `${this.name} works in ${this.department}`;
      }
  }
  let employee = new Employee("Alice", "Sales");
  console.log(employee.getInfo()); // "Alice works in Sales"
  // console.log(employee.name); // Error: 'name' is protected
  ```

#### 5.4.4 Static
- **Definition**: Properties/methods accessed directly on the class, not on instances.
- **Example**:
  ```typescript
  class Greeter {
      static standardGreeting = "Hello, there";
      greet() {
          return Greeter.standardGreeting;
      }
  }
  console.log(Greeter.standardGreeting); // "Hello, there"
  let greeter = new Greeter();
  console.log(greeter.greet()); // "Hello, there"
  ```


  ---

  # Practical Use Cases: Structured Notes

## 6. Practical Use Cases

### 6.1 Tuples in Real-World Scenarios
- **Purpose**: Model structured data with fixed types and order (e.g., database records, API responses).
- **Example**:
  ```typescript
  let user: [number, string, string] = [101, "Alice", "Admin"];
  console.log(`ID: ${user[0]}, Name: ${user[1]}, Role: ${user[2]}`); // "ID: 101, Name: Alice, Role: Admin"
  ```

### 6.2 Enums in Real-World Scenarios
- **Purpose**: Define fixed sets of constants (e.g., statuses, roles).
- **Example**:
  ```typescript
  enum UserRole { Admin = "ADMIN", Editor = "EDITOR", Viewer = "VIEWER" }
  let role: UserRole = UserRole.Admin;
  console.log(role); // "ADMIN"
  ```

### 6.3 Combining Tuples and Enums
- **Purpose**: Create type-safe data structures combining fixed types and constants.
- **Example**:
  ```typescript
  enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
  let employee: [number, string, Status] = [1, "John", Status.Active];
  console.log(employee); // [1, "John", "ACTIVE"]
  ```

### 6.4 Error Handling with Tuples
- **Purpose**: Return multiple values (e.g., result and error) for robust error handling.
- **Example**:
  ```typescript
  function fetchData(): [string | null, Error | null] {
      try {
          return ["data", null];
      } catch (e) {
          return [null, e as Error];
      }
  }
  let [data, error] = fetchData();
  console.log(data, error); // "data", null
  ```

### 6.5 Enums in Switch Statements
- **Purpose**: Enhance control flow for handling enum values.
- **Example**:
  ```typescript
  enum Direction { Up, Down, Left, Right }
  function move(direction: Direction) {
      switch (direction) {
          case Direction.Up: console.log("Moving up"); break;
          case Direction.Down: console.log("Moving down"); break;
          default: console.log("Unknown direction");
      }
  }
  move(Direction.Up); // "Moving up"
  ```

### 6.6 Index Signatures in Real-World Scenarios
- **Purpose**: Handle dynamic property names with type safety.

#### 6.6.1 Dynamic Key-Value Storage
- **Purpose**: Store data with unknown property names (e.g., API responses).
- **Example**:
  ```typescript
  interface Inventory {
      [itemName: string]: number;
  }
  const storeInventory: Inventory = {
      apples: 50,
      bananas: 30,
  };
  console.log(storeInventory.bananas); // 30
  ```

#### 6.6.2 Dictionaries and Lookup Tables
- **Purpose**: Store related values (e.g., user scores, configurations).
- **Example**:
  ```typescript
  type ObjectType = { [key: string]: number };
  const scores: ObjectType = {
      Alice: 85,
      Bob: 92,
  };
  console.log(scores["Alice"]); // 85
  ```

#### 6.6.3 Mapping Enums or Predefined Values
- **Purpose**: Enforce specific keys with flexible values.
- **Example**:
  ```typescript
  type Statuses = "active" | "inactive" | "pending";
  interface StatusMap {
      [key in Statuses]: boolean;
  }
  const userStatus: StatusMap = {
      active: true,
      inactive: false,
      pending: true,
  };
  console.log(userStatus.pending); // true
  ```

### 6.7 Discriminated Unions in Real-World Scenarios
- **Purpose**: Handle objects with varying structures using a discriminator (e.g., shapes, API responses).
- **Example**:
  ```typescript
  interface Circle { kind: "circle"; radius: number; }
  interface Square { kind: "square"; sideLength: number; }
  type Shape = Circle | Square;
  function getArea(shape: Shape): number {
      if (shape.kind === "circle") {
          return Math.PI * shape.radius ** 2;
      }
      return shape.sideLength ** 2;
  }
  const circle: Shape = { kind: "circle", radius: 5 };
  console.log(getArea(circle)); // ~78.54
  ```

### 6.8 Generic Interfaces in Real-World Scenarios
- **Purpose**: Create reusable, type-safe interfaces for different data types.
- **Example**:
  ```typescript
  interface Response<T> {
      data: T;
      status: number;
  }
  const apiResponse: Response<string> = { data: "Success", status: 200 };
  console.log(apiResponse.data); // "Success"
  ```

---

# Accessing External Systems: Structured Notes

## 7. Accessing External Systems

### 7.1 Accessing ATM Machines
- **Purpose**: Integrate with banking APIs for secure transactions (e.g., balance checks, withdrawals).
- **Approach**: Use third-party APIs like Plaid for real-time bank connections; vendor-specific SDKs (Diebold, NCR).
- **Security**: SSL/TLS, authentication; comply with PCI DSS.
- **Example**:
  ```typescript
  interface ATM {
      checkBalance(card: string): [number, string];
      withdraw(card: string, amount: number): [boolean, string];
  }
  class SampleATM implements ATM {
      checkBalance(card: string): [number, string] {
          return [1000, "Balance retrieved"];
      }
      withdraw(card: string, amount: number): [boolean, string] {
          return [true, `${amount} withdrawn`];
      }
  }
  let atm = new SampleATM();
  let [balance, message] = atm.checkBalance("1234-5678");
  console.log(balance, message); // 1000, "Balance retrieved"
  ```

### 7.2 Accessing Human Body Data
- **Purpose**: Aggregate biometric data (heart rate, steps) from wearables for health monitoring.
- **Approach**: APIs from Fitbit, Apple HealthKit, Google Fit; unified services like Terra or WearConnect for 500+ devices.
- **Security**: HIPAA compliance, user consent; normalize data (e.g., timestamps in UTC).
- **Example**:
  ```typescript
  enum HealthMetric { HeartRate = "HR", Steps = "STEPS" }
  interface HealthDevice {
      getData(metric: HealthMetric): [number, string];
  }
  class Wearable implements HealthDevice {
      getData(metric: HealthMetric): [number, string] {
          if (metric === HealthMetric.HeartRate) {
              return [80, "bpm"];
          }
          return [10000, "steps"];
      }
  }
  let device = new Wearable();
  let [value, unit] = device.getData(HealthMetric.HeartRate);
  console.log(value, unit); // 80, "bpm"
  ```

  ---

  # Tuples vs. Enums vs. OOP: Structured Notes

## 8. Tuples vs. Enums vs. OOP

### 8.1 Purpose
- **Tuples**: Store fixed-size, ordered data with mixed types (e.g., database records).
- **Enums**: Define named constants for fixed sets (e.g., statuses, roles).
- **OOP Classes**: Encapsulate data and behavior for complex, reusable objects.

### 8.2 Data Types
- **Tuples**: Heterogeneous (mixed types, e.g., `[string, number]`).
- **Enums**: Numeric (auto-incrementing integers) or string (explicit values).
- **OOP Classes**: Custom types with properties and methods.

### 8.3 Mutability
- **Tuples**: Mutable by default; `readonly` prevents changes.
- **Enums**: Immutable constants.
- **OOP Classes**: Mutable, configurable with access modifiers.

### 8.4 Example
- **Tuples**:
  ```typescript
  let user: [number, string] = [1, "Alice"];
  console.log(user); // [1, "Alice"]
  ```
- **Enums**:
  ```typescript
  enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
  console.log(Status.Active); // "ACTIVE"
  ```
- **OOP Classes**:
  ```typescript
  class Person {
      constructor(public name: string) {}
      greet() { console.log(`Hello, ${this.name}`); }
  }
  let person = new Person("Alice");
  person.greet(); // "Hello, Alice"
  ```

### 8.5 Operations
- **Tuples**: Push (unsafe), pop, modify, destructure.
- **Enums**: Access values, no operations.
- **OOP Classes**: Methods, inheritance, polymorphism.

### 8.6 Type Safety
- **Tuples**: Partial (unsafe with `push`); `readonly` enhances safety.
- **Enums**: Fully type-safe.
- **OOP Classes**: Configurable with access modifiers (`private`, `protected`).

---

# Pro Tips: Structured Notes

## 9. Pro Tips

### 9.1 Tuples
- Use `readonly` to ensure immutability and prevent accidental modifications.
- Avoid `push()` and clearing (`[]`) to maintain type safety.
- Destructure tuples for cleaner, more readable code.
- Example:
  ```typescript
  let readonlyTuple: readonly [string, number] = ["Alice", 30];
  let [name, age] = readonlyTuple;
  console.log(name, age); // "Alice", 30
  ```

### 9.2 Enums
- Use numeric enums for indexing or flags (e.g., bitmasks).
- Use string enums for human-readable constants (e.g., API statuses).
- Combine with switch statements for clear control flow.
- Example:
  ```typescript
  enum Direction { Up = "UP", Down = "DOWN" }
  function move(dir: Direction) {
      switch (dir) {
          case Direction.Up: console.log("Moving up"); break;
          case Direction.Down: console.log("Moving down"); break;
      }
  }
  move(Direction.Up); // "Moving up"
  ```

### 9.3 OOP
- Use `private` or `protected` for encapsulation to protect data integrity.
- Leverage `extends` for inheritance and `implements` for interface contracts to promote reuse.
- Use getters/setters for controlled property access with validation.
- Example:
  ```typescript
  class BankAccount {
      private _balance: number;
      constructor(initialBalance: number) {
          this._balance = initialBalance;
      }
      get balance(): number { return this._balance; }
      set balance(amount: number) {
          if (amount < 0) throw new Error("Invalid amount");
          this._balance = amount;
      }
  }
  let account = new BankAccount(1000);
  console.log(account.balance); // 1000
  ```

### 9.4 Advanced
- Use index signatures for dynamic key-value data (e.g., API responses).
- Apply discriminated unions for type-safe handling of varied structures.
- Use generics for reusable, type-safe interfaces and classes.
- Example:
  ```typescript
  interface Response<T> {
      data: T;
      status: number;
  }
  const apiResponse: Response<string> = { data: "Success", status: 200 };
  console.log(apiResponse.data); // "Success"
  ```
