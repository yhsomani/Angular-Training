### Structured Notes on ES2022 Classes Features

#### 1. **Public Data Descriptor Property on an Object**
- **Definition**: Properties directly defined on an instance of a class, accessible from anywhere.
- **Syntax**: Declared as `field;` or initialized in constructor, e.g., `this.field = value;`.
- **Access**: Via `obj.field` (uses `[[Get]]`/`[[Set]]`).
- **Example**:
  ```javascript:disable-run
  class Person {
    name; // Public field
    constructor(name) {
      this.name = name;
    }
  }
  const p = new Person("Alice");
  console.log(p.name); // Alice
  p.name = "Bob"; // Settable
  ```
- **Characteristics**:
  - Allocated per instance (memory per object).
  - Writable, enumerable, configurable by default.
  - Can be shadowed by assigning to instance.

#### 2. **Public Getters/Setters Accessor Property (Inherited)**
- **Definition**: Getter/setter methods defined on the class’s prototype, inherited by instances.
- **Syntax**: `get prop() {}` / `set prop(val) {}`.
- **Access**: Via `obj.prop` (getter) or `obj.prop = val` (setter).
- **Example**:
  ```javascript
  class Person {
    #agePrivate;
    constructor(age) {
      this.#agePrivate = age;
    }
    get age() { return this.#agePrivate; }
    set age(val) { if (val > 0) this.#agePrivate = val; }
  }
  const p = new Person(23);
  console.log(p.age); // 23
  p.age = 24; // Setter
  ```
- **Characteristics**:
  - Defined once on `Class.prototype`, reused by instances.
  - Encapsulates private fields (e.g., `#agePrivate`).
  - Inherited via prototype chain.

#### 3. **Public Instance Methods (Inherited)**
- **Definition**: Methods defined on the class’s prototype, inherited by instances.
- **Syntax**: `method() {}` in class body.
- **Access**: Via `obj.method()`.
- **Example**:
  ```javascript
  class Person {
    greet() { console.log("Hello"); }
  }
  const p = new Person();
  p.greet(); // Hello
  ```
- **Characteristics**:
  - Defined once on `Class.prototype`, memory-efficient.
  - Can be shadowed by instance properties (via `[[Set]]`).
  - Inherited by subclasses.

#### 4. **Private Data Descriptor Property on an Object**
- **Definition**: Instance properties prefixed with `#`, accessible only within the defining class.
- **Syntax**: `#field;` or `#field = value;` in class.
- **Access**: Only via class methods (e.g., `this.#field`).
- **Example**:
  ```javascript
  class Person {
    #books = [];
    addBook(book) { this.#books.push(book); }
    showBooks() { console.log(this.#books); }
  }
  const p = new Person();
  p.addBook("Book1");
  // console.log(p.#books); // SyntaxError
  ```
- **Characteristics**:
  - Allocated per instance.
  - Strict access control: Throws outside class.
  - Not shadowable.

#### 5. **Private Getters/Setters Accessor Property**
- **Definition**: Private getter/setter methods, prefixed with `#`, for controlled access within class.
- **Syntax**: `get #prop() {}` / `set #prop(val) {}`.
- **Access**: Only within class via `this.#prop`.
- **Example**:
  ```javascript
  class Person {
    #age = 0;
    get #ageVal() { return this.#age; }
    set #ageVal(val) { this.#age = val; }
    updateAge(val) { this.#ageVal = val; }
  }
  ```
- **Characteristics**:
  - Defined once per class, reused by instances.
  - Encapsulates private fields, non-shadowable.

#### 6. **Private Instance Methods (Reused)**
- **Definition**: Methods prefixed with `#`, accessible only within the class, reused by instances.
- **Syntax**: `#method() {}`.
- **Access**: Via `this.#method()` inside class.
- **Example**:
  ```javascript
  class Person {
    #isBookPresent(book) { return this.#books.includes(book); }
    #books = [];
    addBook(book) { if (!this.#isBookPresent(book)) this.#books.push(book); }
  }
  ```
- **Characteristics**:
  - Defined once, memory-efficient.
  - Non-shadowable, throws if attempted.
  - Strict access control.

#### 7. **Public Static Data Descriptor Property**
- **Definition**: Properties defined on the class itself, not instances.
- **Syntax**: `static field = value;`.
- **Access**: Via `Class.field`.
- **Example**:
  ```javascript
  class App {
    static country = "India";
  }
  console.log(App.country); // India
  ```
- **Characteristics**:
  - Single instance per class, shared across subclasses.
  - Writable, shadowable in subclasses.

#### 8. **Public Static Getters/Setters Accessor Property**
- **Definition**: Static getter/setter on the class, not instances.
- **Syntax**: `static get prop() {}` / `static set prop(val) {}`.
- **Access**: Via `Class.prop`.
- **Example**:
  ```javascript
  class App {
    static #name;
    static get appName() { return App.#name; }
    static set appName(val) { App.#name = val; }
  }
  App.appName = "Tech";
  console.log(App.appName); // Tech
  ```
- **Characteristics**:
  - Defined once on class, reusable.
  - Often paired with private static fields.

#### 9. **Public Static Methods**
- **Definition**: Methods defined on the class, not instances.
- **Syntax**: `static method() {}`.
- **Access**: Via `Class.method()`.
- **Example**:
  ```javascript
  class App {
    static show() { console.log("Static"); }
  }
  App.show(); // Static
  ```
- **Characteristics**:
  - Single definition, shared with subclasses.
  - Use for utility functions, singletons.

#### 10. **Private Static Data Descriptor Property**
- **Definition**: Static properties prefixed with `#`, accessible only within the class.
- **Syntax**: `static #field = value;`.
- **Access**: Via `Class.#field` inside class.
- **Example**:
  ```javascript
  class App {
    static #rating = 0;
    static rate(val) { App.#rating = val; }
  }
  ```
- **Characteristics**:
  - One per class, not inherited directly.
  - Strict access control, throws outside class.

#### 11. **Private Static Getters/Setters Accessor Property**
- **Definition**: Static getter/setter with `#`, accessible only within class.
- **Syntax**: `static get #prop() {}` / `static set #prop(val) {}`.
- **Access**: Via `Class.#prop` inside class.
- **Example**:
  ```javascript
  class App {
    static #data;
    static get #val() { return App.#data; }
    static set #val(v) { App.#data = v; }
    static update(v) { App.#val = v; }
  }
  ```
- **Characteristics**:
  - Defined once, non-shadowable.
  - Encapsulates private static fields.

#### 12. **Private Static Methods**
- **Definition**: Static methods with `#`, accessible only within class.
- **Syntax**: `static #method() {}`.
- **Access**: Via `Class.#method()` inside class.
- **Example**:
  ```javascript
  class App {
    static #log() { console.log("Private"); }
    static callLog() { App.#log(); }
  }
  ```
- **Characteristics**:
  - Single definition, non-shadowable.
  - Strict access control.

#### 13. **Inheritance in Objects Created Using Classes**
- **Definition**: Subclasses inherit instance properties/methods via prototype chain (`Class.prototype`).
- **Syntax**: `class Sub extends Super {}`.
- **Access**: Public properties/methods accessible; private only in defining class.
- **Example**:
  ```javascript
  class Person {
    #name;
    constructor(name) { this.#name = name; }
    getName() { return this.#name; }
  }
  class Student extends Person {
    constructor(name) { super(name); }
  }
  const s = new Student("Alice");
  console.log(s.getName()); // Alice
  ```
- **Characteristics**:
  - Public methods/properties inherited.
  - Private fields/methods not directly accessible in subclass (use public getters).
  - `super()` for constructor/method calls.

#### 14. **Inheritance of Static Properties in Classes**
- **Definition**: Static properties/methods inherited via class’s prototype chain (`Class.__proto__`).
- **Syntax**: Access via subclass name.
- **Example**:
  ```javascript
  class A {
    static x = 10;
    static show() { console.log(A.x); }
  }
  class B extends A {}
  console.log(B.x); // 10
  B.show(); // 10
  ```
- **Characteristics**:
  - Public statics inherited, shadowable via `[[Set]]`.
  - Private statics not inherited; throws if accessed via subclass (`this.#field` fails if `this !== DefiningClass`).
  - Access control enforced at runtime.

#### Additional Notes on ES2022 Classes

- **Access Control**:
  - **Public**: Accessible anywhere (instance/class, own/inherited).
  - **Private**: Only within defining class (instance/static). Throws `SyntaxError` outside or if undefined.
  - E.g., `#x` in class `A` inaccessible in class `B` or outside.
  - Runtime check: `this` must match defining class for private access.

- **Shadowing**:
  - **Public**: Instance/static properties/methods shadowable via `[[Set]]` (e.g., `obj.method = newFn`).
  - **Private**: Non-shadowable; attempts throw `SyntaxError`.
  - Static public properties shadowable in subclasses, creating own property.

- **Memory Allocation**:
  - **Instance**: Public/private data descriptors allocated per instance.
  - **Prototype**: Public getters/setters/methods defined once on `Class.prototype`.
  - **Static**: Public/private static properties/methods defined once on class.
  - **Private**: Same memory efficiency as public for getters/setters/methods (reused).

- **Examples Highlights**:
  - **Private Access Error**: `obj.#field` or `Class.#field` outside class throws.
  - **Shadowing Public**: `obj.saySomething = fn` works; `#method` fails.
  - **Static Inheritance Issue**: `Human.checkAnimal()` fails for private `#isAnimal` as `this` is `Human`, not `Animal`.
  - **Encapsulation**: Private fields enforce data hiding; public fields allow direct access (no encapsulation).

- **Best Practices**:
  - Use private fields (`#`) for encapsulation.
  - Prefer public getters/setters over exposed fields.
  - Avoid shadowing unless intentional (confusing).
  - Use statics for singletons/utility functions.
  - Ensure `this` context for private static access (use `Class.#field` explicitly).
```

### Structured Notes on JavaScript and Webpack Concepts

#### 1. **Default, Rest, Spread in JavaScript**
- **Default Parameters**: Assign default values to function parameters if no value or `undefined` is passed.
  ```javascript:disable-run
  function greet(name = "Guest") {
    return `Hello, ${name}`;
  }
  console.log(greet()); // Hello, Guest
  console.log(greet("Alice")); // Hello, Alice
  ```
- **Rest Parameters**: Collects remaining arguments into an array using `...`.
  ```javascript
  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  console.log(sum(1, 2, 3, 4)); // 10
  ```
- **Spread Operator**: Expands elements of an iterable (e.g., array) or object properties.
  ```javascript
  const arr1 = [1, 2];
  const arr2 = [...arr1, 3, 4];
  console.log(arr2); // [1, 2, 3, 4]
  const obj1 = { a: 1 };
  const obj2 = { ...obj1, b: 2 };
  console.log(obj2); // { a: 1, b: 2 }
  ```

#### 2. **Generators and Iterators**
- **Iterators**: Objects with a `next()` method that returns `{ value, done }`.
  ```javascript
  const arr = [1, 2, 3];
  const iterator = arr[Symbol.iterator]();
  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: 3, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
  ```
- **Generators**: Functions that yield values one at a time using `yield`. Defined with `*`.
  ```javascript
  function* generator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const gen = generator();
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 3
  console.log(gen.next().done); // true
  ```
- **Yield Keyword**: Pauses generator function, returns value to caller, resumes on next `next()`.
  ```javascript
  function* example() {
    yield "Hello";
    yield "World";
  }
  const genEx = example();
  console.log(genEx.next().value); // Hello
  console.log(genEx.next().value); // World
  ```

#### 3. **Difference Between Generator and Iterator**
- **Iterator**:
  - Any object with a `next()` method returning `{ value, done }`.
  - Used to iterate over collections (e.g., arrays, strings).
  - Manual creation or built-in (e.g., `array[Symbol.iterator]()`).
- **Generator**:
  - A special type of iterator created by a generator function (uses `*` and `yield`).
  - Automatically implements iterator protocol.
  - Can pause/resume execution, ideal for lazy evaluation or infinite sequences.
- **Key Difference**:
  - Generators simplify creating iterators by handling `next()` and state internally.
  - Iterators require manual implementation of `next()`.

#### 4. **Webpack**
- **Definition**: Module bundler for JavaScript applications. Combines modules, assets (e.g., JS, CSS, images) into optimized bundles.
- **Key Features**:
  - Bundles JS, CSS, and other assets.
  - Supports code splitting, minification, and hot module replacement.
  - Configurable via `webpack.config.js`.

#### 5. **Webpack Dev Server**
- **Definition**: Development server for Webpack with live reloading and hot module replacement.
- **Setup**:
  ```bash
  npm install webpack-dev-server --save-dev
  ```
  - Add to `package.json`:
    ```json
    "scripts": {
      "start": "webpack serve"
    }
    ```
  - Run: `npm start`
- **Features**:
  - Serves app on `http://localhost:8080` (default).
  - Auto-reloads on code changes.
  - Supports hot module replacement for faster development.

#### 6. **Webpack Setup Steps**
1. **Create Project Folder**:
   ```bash
   mkdir my-project
   cd my-project
   ```
2. **Initialize npm**:
   ```bash
   npm init -y
   ```
   - Creates `package.json`.
3. **Install Webpack and CLI**:
   ```bash
   npm install webpack webpack-cli --save-dev
   ```
4. **Create Source Folder and File**:
   ```bash
   mkdir src
   cd src
   touch index.js
   ```
   - Add to `index.js`:
     ```javascript
     console.log("Hello There");
     ```
5. **Create Webpack Config**:
   - File: `webpack.config.js`
     ```javascript
     const path = require("path");
     module.exports = {
       mode: "development", // or "production"
       entry: "./src/index.js",
       output: {
         filename: "bundle.js",
         path: path.resolve(__dirname, "dist"),
       },
     };
     ```
6. **Run Webpack**:
   ```bash
   npx webpack
   ```
   - Outputs `bundle.js` in `dist` folder.

#### 7. **CSS and SASS with Webpack**
- **Install Loaders**:
  ```bash
  npm install style-loader css-loader sass-loader sass --save-dev
  ```
- **Update Webpack Config**:
  ```javascript
  const path = require("path");
  module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  };
  ```
- **Import SASS in `index.js`**:
  ```javascript
  import "../public/styles/mycss.sass";
  console.log("welcome to js");
  ```
- **Create SASS File** (e.g., `public/styles/mycss.sass`):
  ```sass
  body
    background-color: green
  ```

#### 8. **HTML Setup**
- **Create `index.html`**:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./dist/bundle.js"></script>
    <title>Document</title>
  </head>
  <body>
    Hello
  </body>
  </html>
  ```

#### 9. **ES6 Notation in Context**
- **ES6 Features Used**:
  - **Modules**: `import` and `export` for modular code.
    ```javascript
    import "../public/styles/mycss.sass";
    ```
  - **Arrow Functions, Template Literals, etc.**: Common in modern JS projects with Webpack.
- **Webpack with ES6**:
  - Webpack processes ES6 modules (`import/export`) and transpiles them (with tools like Babel, if needed) for browser compatibility.

#### 10. **Summary**
- **Default/Rest/Spread**: Simplify function parameters and array/object manipulation.
- **Generators/Iterators**: Enable custom iteration and lazy evaluation.
- **Webpack**: Bundles and optimizes JS, CSS, and assets.
- **Webpack Dev Server**: Enhances development with live reloading.
- **Setup**: Initialize project, install Webpack, configure loaders for CSS/SASS, bundle code, and serve via HTML.
```


### Structured Notes on JavaScript Concepts

#### General & Data Types

1. **Ways to Create Objects in JavaScript**  
   - **Object Literal**: `const obj = { key: 'value' };` – Simplest, for static objects.  
   - **Object Constructor**: `const obj = new Object(); obj.key = 'value';` – Explicit, less common.  
   - **Object.create()**: `const obj = Object.create(proto);` – Custom prototype, e.g., `Object.create(null)` for no proto.  
   - **Constructor Function**: `function Person(name) { this.name = name; } const p = new Person('Alice');` – Reusable blueprint, prototype-based.  
   - **ES6 Class**: `class Person { constructor(name) { this.name = name; } }` – Syntactic sugar for constructors.  
   - **Factory Function**: `function createPerson(name) { return { name }; }` – Encapsulated, no `new`.  
   - **Object.assign()/Spread**: `const obj = Object.assign({}, source);` or `const obj = { ...source };` – Clone/merge existing objects.

2. **Prototype Chain**  
   - Mechanism for inheritance: Objects link to a prototype via `[[Prototype]]` (`__proto__` or `Object.getPrototypeOf()`).  
   - Property lookup traverses chain to `null`.  
   - E.g., `obj → Object.prototype → null`.  
   - Use: Shared methods (e.g., `toString()`). Check: `isPrototypeOf()`. Issues: Breaks if proto misconfigured.

3. **call(), apply(), bind()**  
   - **call(thisArg, arg1, arg2, ...)**: Invokes function, sets `this`, passes args individually. E.g., `fn.call(obj, 1, 2)`.  
   - **apply(thisArg, [args])**: Like `call`, but args as array. E.g., `fn.apply(obj, [1, 2])`.  
   - **bind(thisArg, arg1, ...)**: Returns new function with fixed `this`/args. E.g., `const bound = fn.bind(obj, 1);`.  
   - Diff: `call/apply` immediate; `bind` deferred. All manage `this` context.

4. **JSON and Common Operations**  
   - JSON: Lightweight data format (objects, arrays, primitives). No functions/dates.  
   - **Operations**:  
     - `JSON.stringify(value, replacer?, space?)`: JS → string. E.g., `JSON.stringify({a:1}) → '{"a":1}'`.  
     - `JSON.parse(text, reviver?)`: String → JS. E.g., `JSON.parse('{"a":1}') → {a:1}`.  
   - Use: APIs, storage. Handle errors: `try/catch` for parse, manage circular refs.

5. **Array slice()**  
   - `slice(start?, end?)`: Returns shallow copy of array portion (non-mutating).  
   - E.g., `[1,2,3].slice(1,2) → [2]`. Negative indices: `-1` is last.  
   - Use: Subarrays, cloning, convert array-like (e.g., `arguments`).

6. **Array splice()**  
   - `splice(start, deleteCount?, ...items)`: Modifies array, removes/adds elements. Returns removed.  
   - E.g., `[1,2,3].splice(1,1,'a') → [2]; array → [1,'a',3]`.  
   - Use: In-place edits (add/remove/replace).

7. **slice() vs splice()**  
   - **slice()**: Non-mutating, returns copy, `slice(start, end)`.  
   - **splice()**: Mutating, modifies array, `splice(start, deleteCount, ...items)`.  
   - Return: `slice` (subarray), `splice` (removed).  
   - Use: `slice` for safe extraction; `splice` for edits.

8. **Object vs Map**  
   - **Object**: String/symbol keys, no order guarantee, `Object.keys().length`, prototype risks.  
   - **Map**: Any key type, insertion order, `map.size`, clean API (`set/get/has/delete`).  
   - Use: Objects for configs; Maps for dynamic keys, frequent updates.  
   - Variant: `WeakMap` for GC-friendly object keys.

9. **== vs ===**  
   - **`==`**: Loose equality, coerces types. E.g., `5 == '5' → true`.  
   - **`===`**: Strict equality, no coercion. E.g., `5 === '5' → false`.  
   - Use: Prefer `===` for predictability; `==` for intentional coercion.

#### Functions

10. **Arrow Functions**  
    - Syntax: `(args) => expr` or `(args) => { body }`.  
    - Features: Lexical `this`, no `arguments`, implicit return (no `{}`), no `prototype`.  
    - Use: Callbacks, non-methods. E.g., `[1,2].map(x => x*2)`.  
    - Limit: Not for constructors or dynamic `this`.

11. **First-Class Function**  
    - Functions as values: Assign (`obj.fn = () => {}`), pass (`setTimeout(fn)`), return (`return () => {}`).  
    - Enables callbacks, HOFs, FP patterns.

12. **Higher-Order/First-Order Function**  
    - **Higher-Order**: Takes/returns functions. E.g., `map(callback)`, `function makeAdder(n) { return x => x+n; }`.  
    - **First-Order**: Regular function, no function args/returns. E.g., `function add(a,b) { return a+b; }`.  
    - Use: HOFs for abstraction (e.g., `filter`, `reduce`).

13. **Unary Function**  
    - Takes one argument. E.g., `x => x*2`, `Math.sqrt(x)`.  
    - Use: FP composition, array methods, currying steps.

14. **Currying**  
    - Converts `f(a,b)` to `f(a)(b)`. E.g., `const add = a => b => a+b; add(2)(3) → 5`.  
    - Use: Partial application, reusable configs.  
    - Impl: Manual or `function curry(fn) { ... }`.

15. **Pure Function**  
    - Same input → same output, no side effects (no mutations, I/O).  
    - E.g., `const add = (a,b) => a+b`. Impure: `Math.random()`.  
    - Use: Predictable, testable code.

16. **Benefits of Pure Functions**  
    - Predictable: Deterministic outputs.  
    - Testable: No mocks/setup.  
    - Cacheable: Memoization for perf.  
    - Composable: Chainable (e.g., `pipe(f,g)`).  
    - Parallel: No state conflicts.  
    - Refactorable: Swap without side effects.

#### Variables, Scope & Hoisting

17. **Purpose of let**  
    - Declares block-scoped variables, fixing `var`’s function-scope leaks.  
    - E.g., `for (let i=0; i<5; i++) {}` – `i` scoped to loop.  
    - No redeclaration, TDZ for safety.

18. **var vs let vs const**  
    - **var**: Function/global scope, hoisted (undefined), redeclarable, reassignable.  
    - **let**: Block scope, hoisted (TDZ), no redeclaration, reassignable.  
    - **const**: Block scope, hoisted (TDZ), no redeclaration/reassignment (objects mutable).  
    - Use: `const` default, `let` for loops, avoid `var`.

19. **Why let as a Keyword?**  
    - Fixes `var`’s scoping issues (loop leaks).  
    - Intuitive: Math-like (Lisp/Scheme).  
    - Backward-compatible, distinct from `var`.  
    - TC39 chose for clarity, TDZ enforcement.

20. **Block-Scoped Variable in switch**  
    - `switch` shares scope; `let` redeclares → error.  
    - Fix: Add `{}` per case.  
      ```javascript:disable-run
      switch (x) {
        case 1: { let y = 1; break; }
        case 2: { let y = 2; break; }
      }
      ```

21. **Temporal Dead Zone (TDZ)**  
    - Period from block start to `let/const` declaration where access throws `ReferenceError`.  
    - E.g., `console.log(x); let x=1;` → error.  
    - Ensures init before use, unlike `var` (undefined).

22. **IIFE (Immediately Invoked Function Expression)**  
    - `(function() { /* code */ })();` – Runs instantly, private scope.  
    - Use: Avoid globals, module pattern. E.g., `(function() { var x=1; })();`.  
    - Modern: Modules replace IIFEs.

23. **Encode/Decode URL**  
    - **Encode**: `encodeURIComponent(str)` for query params (escapes `&=/`), `encodeURI(url)` for full URLs.  
    - **Decode**: `decodeURIComponent(str)`.  
    - E.g., `encodeURIComponent('a b') → 'a%20b'`. Use: Safe API calls.

24. **Memoization**  
    - Cache function results by input.  
    - E.g., `const memo = {}; function fib(n) { return memo[n] || (memo[n] = n<=1 ? n : fib(n-1)+fib(n-2)); }`.  
    - Use: Optimize pure, expensive functions. Limit: Memory trade-off.

25. **Hoisting**  
    - Declarations (`var`, function) moved to scope top, not initializations.  
    - E.g., `console.log(x); var x=1;` → undefined. `let/const` → TDZ.  
    - Functions: Full hoist. Avoid reliance for clarity.

26. **ES6 Classes**  
    - Syntactic sugar for prototype-based OOP.  
    - E.g., `class Person { constructor(name) { this.name = name; } }`.  
    - Features: `extends`, `super`, static, getters/setters. No hoist, strict mode.

27. **Closures**  
    - Function retaining outer scope variables post-execution.  
    - E.g., `function outer() { let x=1; return () => x++; } const fn = outer();`.  
    - Use: Private vars, currying, callbacks. Watch: Memory leaks.

28. **Modules**  
    - ES6: `export const x=1;`, `import {x} from './mod.js';`.  
    - Static, tree-shakable, scoped.  
    - Use: Organize code, no globals. Dynamic: `import()`.

29. **Why Modules Needed?**  
    - Prevent global pollution, naming clashes.  
    - Encapsulation, dependency clarity, tree-shaking.  
    - Replace IIFEs, unify CommonJS/AMD.

30. **Scope in JavaScript**  
    - Rules for identifier access:  
      - **Global**: Window-level, avoid.  
      - **Function**: `var`/`function`, params.  
      - **Block**: `let/const` in `{}`.  
    - Lexical (static). Shadowing allowed. Avoid `with`/`eval`.

#### Browser APIs & Web Workers

31. **Service Worker**  
    - Background script, proxies network (fetch), enables offline/PWAs.  
    - Lifecycle: Register (`navigator.serviceWorker.register()`), install, activate.  
    - No DOM; uses Cache API, push notifications.

32. **Service Worker Communication with DOM**  
    - No direct DOM access; uses `postMessage()`.  
    - Main → SW: `worker.postMessage(data);`.  
    - SW → Main: `self.postMessage(data);`.  
    - E.g., `self.addEventListener('message', e => self.postMessage(e.data));`.

33. **Data Reuse Across Service Worker Restarts**  
    - Persist via:  
      - **IndexedDB**: Structured, async storage.  
      - **Cache API**: For resources (`caches.open('v1')`).  
      - **localStorage**: Sync, limited.  
    - Migrate on `activate` event.

34. **IndexedDB**  
    - Browser NoSQL DB for large data (objects/blobs).  
    - API: `indexedDB.open(name, version)`, transactions, object stores.  
    - E.g., `db.transaction('store').objectStore('store').add(data);`.  
    - Use: Offline apps, complex data.

35. **Web Storage**  
    - Key-value store: `localStorage` (persistent), `sessionStorage` (tab).  
    - ~5MB, strings only, same-origin.  
    - Access: `setItem()`, `getItem()`, `removeItem()`, `clear()`.

36. **Purpose of postMessage()**  
    - Cross-context messaging (windows/iframes/workers).  
    - E.g., `window.postMessage(data, 'https://example.com')`.  
    - Secure: Check `e.origin` in `message` listener.

37. **Cookie**  
    - Small (~4KB) key-value string, sent with HTTP requests.  
    - Set via `Set-Cookie` header or `document.cookie`.  
    - Use: Session tracking, prefs.

38. **Why Cookies Used?**  
    - Stateful HTTP: Auth tokens, user settings, analytics.  
    - Auto-sent with requests, server-controlled.

39. **Common Cookie Attributes**  
    - `Expires/Max-Age`: Lifespan.  
    - `Domain`: Scope (e.g., `.example.com`).  
    - `Path`: URL prefix.  
    - `Secure`: HTTPS only.  
    - `HttpOnly`: No JS access.  
    - `SameSite`: CSRF protection (Strict/Lax/None).

40. **Delete a Cookie**  
    - Set past `Expires`: `document.cookie = 'name=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';`.  
    - Match original `Path`/`Domain`.

41. **Cookies vs localStorage vs sessionStorage**  
    - **Cookies**: Server-sent, HTTP headers, 4KB, attrs (HttpOnly).  
    - **localStorage**: Client-only, 5-10MB, persistent, tab-sync.  
    - **sessionStorage**: Client-only, tab-only, 5-10MB.  
    - Use: Cookies for server; storage for client.

42. **localStorage vs sessionStorage**  
    - **localStorage**: Persists across sessions/tabs.  
    - **sessionStorage**: Clears on tab close, per-tab.  
    - Both: Same API, same-origin.

43. **Access Web Storage APIs**  
    - `localStorage/sessionStorage`:  
      - `setItem(key, val)`  
      - `getItem(key)` → string/null  
      - `removeItem(key)`  
      - `clear()`  
      - `key(i)` → ith key  
      - `length` → count

44. **sessionStorage Methods**  
    - Same as `localStorage`: `setItem`, `getItem`, `removeItem`, `clear`, `key`, `length`.

45. **Storage Event**  
    - Fires on `window` for same-origin storage changes (other tabs).  
    - Props: `key`, `oldValue`, `newValue`, `url`, `storageArea`.  
    - E.g., `window.addEventListener('storage', e => console.log(e.key));`.

46. **Why Web Storage Useful?**  
    - Simple client-side persistence: Cache, prefs, offline.  
    - No server, faster than cookies, larger quota.

47. **Check Web Storage Support**  
    - `typeof(Storage) !== 'undefined'` or `!!window.localStorage`.  
    - Try-catch for quota errors.

48. **Check Web Worker Support**  
    - `typeof(Worker) !== 'undefined'` or `!!window.Worker`.  
    - Try `new Worker()` in try-catch.

49. **Web Worker Example**  
    - **Main (main.js)**:  
      ```javascript
      const worker = new Worker('worker.js');
      worker.postMessage({ num: 5 });
      worker.onmessage = e => console.log(e.data); // 10
      ```
    - **Worker (worker.js)**:  
      ```javascript
      self.onmessage = e => self.postMessage(e.data.num * 2);
      ```
    - Use: Offload CPU tasks, no DOM access.
```


# Structured Notes on JavaScript and Webpack Concepts

## General & Data Types

1. **Arrow Functions**
   - **Definition**: Concise function expressions using `=>` syntax, introduced in ES6.
   - **Syntax**: `(args) => expr` or `(args) => { body }`.
   - **Features**:
     - Lexical `this` binding (inherits from parent scope).
     - No `arguments` object (use rest parameters).
     - Implicit return without `{}`.
     - No `prototype`, not suitable for constructors.
   - **Example**:
     ```javascript
     const addArrow = (a, b) => a + b;
     console.log(addArrow(10, 20)); // 30
     ```
   - **Use**: Callbacks, non-method functions, array methods.
   - **Limitations**: Not for methods needing dynamic `this` or constructors.

2. **Default Parameters**
   - **Definition**: Assign default values to function parameters if undefined or not passed.
   - **Syntax**: `function fn(param = value) {}`.
   - **Example**:
     ```javascript
     function greet(name = "Guest") {
       return `Hello, ${name}`;
     }
     console.log(greet()); // Hello, Guest
     ```
   - **Use**: Simplify function calls, provide fallback values.

3. **Rest Parameters**
   - **Definition**: Collects remaining arguments into an array using `...`.
   - **Syntax**: `function fn(...rest) {}`.
   - **Example**:
     ```javascript
     function sum(...numbers) {
       return numbers.reduce((total, num) => total + num, 0);
     }
     console.log(sum(1, 2, 3)); // 6
     ```
   - **Use**: Variable argument lists, array methods.

4. **Spread Operator**
   - **Definition**: Expands iterables/objects into individual elements/properties.
   - **Syntax**: `...array` or `...object`.
   - **Example**:
     ```javascript
     const arr1 = [1, 2];
     const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
     const obj1 = { a: 1 };
     const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
     ```
   - **Use**: Array/object cloning, merging, function args.

5. **Iterators**
   - **Definition**: Objects with `next()` method returning `{ value, done }`.
   - **Syntax**: Implement `[Symbol.iterator]`.
   - **Example**:
     ```javascript
     const iterator = {
       current: 0,
       last: 5,
       next() {
         return this.current <= this.last
           ? { value: this.current++, done: false }
           : { done: true };
       }
     };
     let result = iterator.next();
     while (!result.done) {
       console.log(result.value); // 0, 1, 2, 3, 4, 5
       result = iterator.next();
     }
     ```
   - **Use**: Custom iteration, for-of loops.

6. **Generators**
   - **Definition**: Functions that yield values one at a time, pausing execution.
   - **Syntax**: `function* fn() { yield value; }`.
   - **Example**:
     ```javascript
     function* gfg() {
       yield 10;
       yield 20;
       yield 30;
     }
     const gen = gfg();
     console.log(gen.next()); // { value: 10, done: false }
     console.log(gen.next()); // { value: 20, done: false }
     console.log(gen.next()); // { value: 30, done: false }
     console.log(gen.next()); // { value: undefined, done: true }
     ```
   - **Use**: Lazy evaluation, infinite sequences, async iteration.

7. **Generator vs Iterator**
   - **Iterator**: Manual `next()` implementation, explicit state management.
   - **Generator**: Auto-implements iterator protocol, uses `yield` for pausing.
   - **Key Difference**: Generators simplify iteration logic, ideal for complex sequences.

8. **Object.defineProperty**
   - **Definition**: Configures property attributes (value, writable, enumerable, configurable).
   - **Syntax**: `Object.defineProperty(obj, prop, descriptor)`.
   - **Example**:
     ```javascript
     const student = { name: 'yash' };
     Object.defineProperty(student, 'setName', {
       set(name) { this.name = name; }
     });
     Object.defineProperty(student, 'getName', {
       get() { return this.name; }
     });
     student.setName = "Lokesh";
     console.log(student.getName); // Lokesh
     ```
   - **Use**: Custom getters/setters, control property behavior.

9. **JSON Operations**
   - **Definition**: Lightweight data format for objects, arrays, primitives.
   - **Operations**:
     - `JSON.stringify(obj)`: Object to string.
     - `JSON.parse(str)`: String to object.
   - **Example**:
     ```javascript
     const obj = { name: "Alice", age: 30 };
     const str = JSON.stringify(obj); // '{"name":"Alice","age":30}'
     console.log(JSON.parse(str)); // { name: "Alice", age: 30 }
     ```
   - **Use**: APIs, storage. Handle errors with `try/catch`.

## Classes and Inheritance

10. **ES6 Classes**
    - **Definition**: Syntactic sugar for prototype-based OOP.
    - **Syntax**: `class Name { constructor() {} }`.
    - **Features**:
      - Public/private fields, getters/setters, methods.
      - Static members, inheritance via `extends`.
      - No hoisting, strict mode.
    - **Example**:
      ```javascript
      class Employee {
        #data = 100; // Private field
        constructor(empId, name, salary) {
          this.empId = empId;
          this.name = name;
          this.salary = salary;
        }
        showEmployeeDetails() {
          console.log(`Employee Id: ${this.empId}`);
          console.log(`Employee Name: ${this.name}`);
          console.log(`Employee Salary: ${this.salary}`);
        }
      }
      ```
    - **Use**: Structured OOP, encapsulation.

11. **Inheritance with Classes**
    - **Definition**: Subclasses inherit via `extends`, using `super` for parent constructor/methods.
    - **Example**:
      ```javascript
      class SalesEmployee extends Employee {
        constructor(empId, name, salary, sales) {
          super(empId, name, salary);
          this.sales = sales;
        }
        showEmployeeDetails() {
          super.showEmployeeDetails();
          console.log(`Employee Sales: ${this.sales}`);
        }
      }
      const s1 = new SalesEmployee(1, "Rakesh", 20000, 50000);
      s1.showEmployeeDetails();
      ```
    - **Use**: Code reuse, specialization.

12. **Private Fields in Classes**
    - **Definition**: Fields prefixed with `#`, accessible only within class.
    - **Example**:
      ```javascript
      class Employee {
        #data = 100;
        getData() { return this.#data; }
      }
      ```
    - **Use**: Encapsulation, data hiding.

13. **Getters and Setters in Classes**
    - **Definition**: Control property access with `get`/`set`.
    - **Example**:
      ```javascript
      class Employee {
        #empId;
        set empId(id) { this.#empId = id; }
        get empId() { return this.#empId; }
      }
      const emp = new Employee();
      emp.empId = 1;
      console.log(emp.empId); // 1
      ```
    - **Use**: Validation, computed properties.

14. **Commission and Net Salary Calculation**
    - **Logic**: Based on sales amount:
      - `<5000`: 7% commission.
      - `>=5000 <10000`: 10%.
      - `>=10000 <15000`: 15%.
      - `>=15000`: 20%.
      - `netSalary = salary + commission`.
    - **Example**:
      ```javascript
      class SalesEmployee extends Employee {
        constructor(empId, name, salary, sales) {
          super(empId, name, salary);
          this.sales = sales;
          this.commission = 0;
          this.netSalary = 0;
        }
        calculateSalary() {
          if (this.sales < 5000) this.commission = this.salary * 0.07;
          else if (this.sales < 10000) this.commission = this.salary * 0.1;
          else if (this.sales < 15000) this.commission = this.salary * 0.15;
          else this.commission = this.salary * 0.2;
          this.netSalary = this.salary + this.commission;
          console.log(`Commission: ${this.commission}, Net Salary: ${this.netSalary}`);
        }
      }
      const s1 = new SalesEmployee(1, "Rakesh", 20000, 5000);
      s1.calculateSalary(); // Commission: 2000, Net Salary: 22000
      ```

## Error Handling

15. **Try/Catch/Finally**
    - **Definition**: Handle errors gracefully.
      - `try`: Code that might throw.
      - `catch`: Handle errors.
      - `finally`: Always executes.
    - **Example**:
      ```javascript
      function processUserData(jsonString) {
        try {
          let user = JSON.parse(jsonString);
          if (!user.name || !user.age) throw new Error("Missing name or age");
          console.log(`User: ${user.name}, Age: ${user.age}`);
        } catch (error) {
          console.error(`Error: ${error.message}`);
        } finally {
          console.log("Processing complete");
        }
      }
      processUserData('{"name":"Alice"}'); // Error: Missing name or age
      ```
    - **Use**: JSON parsing, async operations, validation.

16. **Custom Error Classes**
    - **Definition**: Extend `Error` for specific error types.
    - **Example**:
      ```javascript
      class ValidationError extends Error {
        constructor(message) {
          super(message);
          this.name = "ValidationError";
        }
      }
      function readUser(json) {
        try {
          let user = JSON.parse(json);
          if (!user.age) throw new ValidationError("Age required");
          return user;
        } catch (error) {
          console.error(`${error.name}: ${error.message}`);
        }
      }
      readUser('{"name":"Yash"}'); // ValidationError: Age required
      ```
    - **Use**: Domain-specific error handling.

## File and Data Processing

17. **CSV Processing with fast-csv**
    - **Definition**: Library to parse/write CSV files in Node.js.
    - **Example**:
      ```javascript
      const fs = require('fs');
      const csv = require('fast-csv');
      const data = [{ label: "Jan", value: 450 }, { label: "Feb", value: 620 }];
      fs.createWriteStream('output.csv')
        .pipe(csv.write(data, { headers: true }))
        .on('finish', () => console.log('CSV written'));
      ```
    - **Use**: Data export, reporting.

18. **ASCII Chart Generation**
    - **Definition**: Create visual bars using characters (e.g., `█`) based on data values.
    - **Example**:
      ```javascript
      function createAsciiBar(value, maxValue) {
        const barWidth = Math.round((value / maxValue) * 50);
        return '█'.repeat(barWidth);
      }
      const data = [{ label: "Jan", value: 450 }, { label: "Feb", value: 620 }];
      const maxValue = Math.max(...data.map(item => item.value));
      console.log(data.map(item => `${item.label}: ${createAsciiBar(item.value, maxValue)}`));
      ```
    - **Use**: Simple data visualization in text.

## Web Development

19. **Web Workers**
    - **Definition**: Run scripts in background threads, no DOM access.
    - **Example**:
      ```javascript
      // main.js
      const worker = new Worker('worker.js');
      worker.postMessage({ num: 5 });
      worker.onmessage = e => console.log(e.data); // 10
      // worker.js
      self.onmessage = e => self.postMessage(e.data.num * 2);
      ```
    - **Use**: Offload heavy computations, keep UI responsive.

20. **CSV Data Visualizer (day7.html)**
    - **Definition**: Web app to upload CSV, display table, and render charts using Chart.js/Papa Parse.
    - **Features**:
      - File upload with drag-and-drop.
      - Dynamic table with pagination (100 rows/page).
      - Chart types: Bar, Line, Pie, Doughnut.
      - Aggregations: Sum, Average, Count.
    - **Tech**: HTML, Tailwind CSS, Chart.js, Papa Parse, Web Worker for data processing.
    - **Example Flow**:
      - Upload CSV → Parse with Papa Parse → Populate table/selectors → Web Worker aggregates data → Render Chart.js chart.

21. **Flashcard App (gemified.html)**
    - **Definition**: Interactive flashcards for learning JavaScript concepts.
    - **Features**:
      - Flip animation (CSS transform).
      - Navigation: Previous, Next, Shuffle, Keyboard (arrows/space).
      - 49 cards with questions/answers.
    - **Tech**: HTML, Tailwind CSS, JavaScript, CSS animations.
    - **Example**:
      ```javascript
      const flashcard = document.getElementById('flashcard');
      flashcard.classList.toggle('is-flipped'); // Flip card
      ```

## Webpack and Build Tools

22. **Webpack**
    - **Definition**: Module bundler for JavaScript, CSS, and assets.
    - **Key Features**:
      - Bundles modules into single file(s).
      - Supports code splitting, minification, HMR.
      - Loaders (e.g., css-loader), plugins.
    - **Config**:
      ```javascript
      module.exports = {
        mode: "development",
        entry: "./src/index.js",
        output: {
          filename: "bundle.js",
          path: require("path").resolve(__dirname, "dist"),
        },
        module: {
          rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }],
        },
      };
      ```

23. **Webpack Dev Server**
    - **Definition**: Development server with live reloading, HMR.
    - **Setup**:
      ```bash
      npm install webpack-dev-server --save-dev
      ```
      ```json
      "scripts": { "start": "webpack serve" }
      ```
      ```javascript
      devServer: { static: { directory: require("path").join(__dirname, "dist") }, port: 9000 }
      ```
    - **Use**: Rapid development, auto-refresh on changes.

24. **Babel**
    - **Definition**: Transpiles modern JavaScript (ES6+) to older versions.
    - **Config** (babel.config.js):
      ```javascript
      module.exports = {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      };
      ```
    - **Use**: Browser compatibility, ES6+ in Node.js.

25. **Jest**
    - **Definition**: Testing framework for JavaScript.
    - **Config** (jest.config.js):
      ```javascript
      module.exports = { testEnvironment: 'node' };
      ```
    - **Example**:
      ```javascript
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      require('./index.js');
      expect(log).toHaveBeenCalledWith('Hello There');
      ```
    - **Use**: Unit tests, mocking, coverage.

26. **CSS/SASS with Webpack**
    - **Loaders**: `style-loader` (injects CSS), `css-loader` (processes CSS), `sass-loader` (compiles SASS).
    - **Config**:
      ```javascript
      module.exports = {
        module: {
          rules: [{ test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] }],
        },
      };
      ```
    - **Example**:
      ```javascript
      import "../dist/style/mycss.css";
      ```
      ```css
      body { background-color: gray; }
      ```

27. **Project Setup with Webpack**
    - **Steps**:
      1. `npm init -y` → Create `package.json`.
      2. `npm install webpack webpack-cli webpack-dev-server --save-dev`.
      3. Create `src/index.js`, `dist/index.html`.
      4. Configure `webpack.config.js` (entry, output, loaders).
      5. Add scripts: `"start": "webpack serve"`, `"build": "webpack"`.
      6. Run: `npm start` or `npm run build`.

28. **package.json**
    - **Definition**: Defines project metadata, scripts, dependencies.
    - **Example**:
      ```json
      {
        "name": "newproject",
        "scripts": {
          "start": "webpack serve",
          "test": "jest"
        },
        "devDependencies": {
          "@babel/core": "^7.28.4",
          "jest": "^30.2.0",
          "webpack": "^5.102.1"
        }
      }
      ```
    - **Use**: Manage build, test, and run commands.
