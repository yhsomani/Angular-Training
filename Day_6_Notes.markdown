### File Contents

#### assignment.html
Empty user data table with headers: Id, First Name, Last Name, Email, Department, Position.

#### Data.json
Array of 10 user objects:
- Example: `{ "id": 1, "firstName": "Alice", "lastName": "Johnson", "email": "alice.johnson@example.com", "department": "Marketing", "position": "Marketing Manager" }`

#### day6.html
Simple button: "Click me".

#### Examplecode.txt
51 JavaScript examples:
1. First program: `alert("Hello World");`
2. Single-line comment: `// Comment`
3. Multi-line comment: `/* Comment */`
4. Variables: Declare, assign, reassign, display.
5. If statement: Greeting if time < 10.
6. If...Else: Greeting based on time.
7. If...Else if...Else: Age-based category.
8. Switch: Day-based greeting.
9-10. Alert boxes: Basic and with variables.
11. Confirm box: User confirmation.
12. Prompt box: User input.
13. Call function: Alert message.
14. Function with argument: Alert parameter.
15. Multiple functions with arguments.
16. Function return value; with arguments (e.g., multiply 4*3=12).
17. For loop: i=0 to 5.
18. Loop through HTML headers.
19. While loop: i=0 to 5.
20. Do-While loop: i=0 to 5.
21. Break loop: At i=3.
22. For...in: Loop object properties.
23. Add event: Display date on click.
24. Mouseover event: Planet descriptions.
25. Try-Catch: Handle division by zero.
26. Try-Catch with Confirm: User retry option.
27. OnError: Handle script errors.
28. Timing: setTimeout (2s delay).
29. Infinite timing: setInterval counter; clearInterval to stop.
30. Access object members: dateObj.getFullYear().
31. Direct object instance: new Date().
32. Clock: Real-time display with setInterval.
33. String length: "Hello World".length=11.
34. Create array: `var fruits = ["Apple", "Banana"];`
35-36. Join arrays: concat two/three.
37. Join array to string: join(",").
38. Remove last: pop().
39. Add to end: push().
40. Reverse array.
41. Remove first: shift().
42. Sort array alphabetically.
43. Numeric sort ascending.
44. Numeric sort descending.
45. Add at position: splice.
46. Boolean check: typeof true="boolean".
47. Math.max(1,2,3)=3.
48. Math.min(1,2,3)=1.
49. Celsius to Fahrenheit: (C*9/5)+32; Math.round.
50. Display alert: window.alert.
51. Open window: window.open.

#### fetchData.html
Empty fetch script placeholder.

#### jsonCSV.html
Empty JSON/CSV conversion placeholder.

#### output.csv
CSV data:
```
name,age,city
John Doe,28,New York
Jane Smith,34,Los Angeles
Sam Johnson,45,Chicago
```

#### Summary - Quizizz Day 6.pdf
PDF metadata/stream (garbled; quiz summary on JS topics: objects, loops, functions, ES6).

#### writeCSV.js
Node.js script using fast-csv to write sample data to output.csv.

#### Quiz/Quiz.html
Quiz UI: Loads questions, timer (10s), options, Next button.

#### Quiz/Quiz.json
5-question quiz:
1. HTML acronym: "Hyper Text Markup Language"
2. FIFO structure: "Queue"
3. Python function keyword: "def"
4. Non-primitive Java type: "String"
5. JS typeof null: "\"object\""

### Objects: Literal vs Constructor

#### Literal Version
- JSON-like direct creation.
- Sample:
```js
var obj = { name: "Yash", age: 25 };
console.log(obj); // {name: "Yash", age: 25}
```

#### Constructor Version
- Function blueprint for instances.
- Sample:
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("Yash", 25);
console.log(person); // Person {name: "Yash", age: 25}
```

#### Differences
| Aspect       | Literal                  | Constructor              |
|--------------|--------------------------|--------------------------|
| Creation    | Simple, one-off         | Reusable blueprint      |
| Methods     | No easy addition        | Supports prototypes     |
| Use Case    | Quick objects           | Classes/instances       |

### Array Iteration

#### Data Example
```js
var data = ["Yash", "Lokesh", "Kaushal"];
```

#### ES5 forEach
```js
data.forEach(function (name, index, coll) {
  console.log("Index: " + index + " Name: " + name + " Coll:" + coll);
});
```

#### ES6 forEach
```js
data.forEach((name, index, coll) => {
  console.log("Index: " + index + " Name: " + name + " Coll:" + coll);
});
```

#### for...in Loop
```js
for(var i in data){
  console.log("index: "+i+" Value:"+data[i]);
}
```

#### Named Function with forEach
```js
function myFunction(name, index) {
  console.log("index: "+index+" Value:"+name);
}
data.forEach(myFunction);
```

#### map()
```js
data.map(name => console.log(" " + name));
```

### Map, Filter, Reduce Examples

#### map: Transform
```js
var doubled = data.map(name => name.length * 2); // [4, 6, 7]
```

#### filter: Subset
```js
var longNames = data.filter(name => name.length > 5); // ["Kaushal"]
```

#### reduce: Aggregate
```js
var totalLength = data.reduce((acc, name) => acc + name.length, 0); // 17
```

### JSON Server
- Install: `npm install -g json-server`
- Run: `json-server data.json -p 2020` (port 2020; default ~3000)

### Errors and Libraries
- onError: Predefined for runtime errors (e.g., example 27).
- Library: fast-csv (for CSV handling in writeCSV.js).
- Run JS: `node filename.js`

### Node.js Modules
- Predefined: http, util.
- Paths: Absolute (full path) vs Relative (./, ../).
- Exports: `export` vs `module.exports`.

#### 7 Export Patterns

1. **Define Global**
   ```js:disable-run
   // firstFile.js
   foo = function () { console.log('foo!'); };
   // app.js
   require('./firstFile.js');
   foo();
   ```

2. **Export Anonymous Function**
   ```js
   // bar.js
   module.exports = function () { console.log('bar!'); };
   // app.js
   var fun = require('./bar.js');
   fun();
   ```

3. **Export Named Function**
   ```js
   // first.js
   exports.fiz = function () { console.log('fiz!'); };
   // app.js
   var FOO = require('./first.js').fiz;
   FOO();
   ```

4. **Export Anonymous Object**
   ```js
   // firstFile.js
   var Buz = function () {};
   Buz.prototype.myLog = function () { console.log('buz!'); };
   module.exports = new Buz();
   // app.js
   var fun = require('./firstFile.js');
   fun.myLog();
   ```

5. **Export Named Object**
   ```js
   // firstFile.js
   var Baz = function () {};
   Baz.prototype.log = function () { console.log('baz!'); };
   exports.Baz = new Baz();
   // app.js
   var fun = require('./firstFile.js').Baz;
   fun.log();
   ```

6. **Export Anonymous Prototype**
   ```js
   // firstFile.js
   var Doo = function () {};
   Doo.prototype.log = function () { console.log('doo!'); };
   module.exports = Doo;
   // app.js
   var Doo = require('./firstFile.js');
   var doo = new Doo();
   doo.log();
   ```

7. **Export Named Prototype**
   ```js
   // firstFile.js
   var Qux = function () {};
   Qux.prototype.log = function () { console.log('qux!'); };
   exports.Qux = Qux;
   // app.js
   var Qux = require('./firstFile.js').Qux;
   var qux = new Qux();
   qux.log();
   ```

### ES6 Features
- ECMA: European Computer Manufacturers Association.

#### Top 10
1. **Default Parameters**: `function greet(name = "Guest") { ... }`
2. **Template Literals**: `console.log(`Hello ${name}`);`
3. **Multi-line Strings**: `` `Line1\nLine2` ``
4. **Destructuring**: `const {name, age} = person;`
5. **Enhanced Object Literals**: `{name, getName() { ... }}`
6. **Arrow Functions**: `() => { ... }`
7. **Promises**: `new Promise((resolve, reject) => { ... })`
8. **Block-scope**: let/const
9. **Classes**: `class Person { constructor(name) { ... } }`
10. **Modules**: export/import

### let vs const vs var

| Feature    | var                  | let                  | const                |
|------------|----------------------|----------------------|----------------------|
| Scope     | Function            | Block               | Block               |
| Hoisting  | Yes (undefined)     | Yes (TDZ error)     | Yes (TDZ error)     |
| Reassign  | Yes                 | Yes                 | No                  |
| Redeclare | Yes                 | No                  | No                  
```
