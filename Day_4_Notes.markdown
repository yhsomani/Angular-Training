# Web Development Notes

## HTML Forms
- **Basic Form Structure**: Uses `<form>` tag with attributes like `action` (URL to send data) and `method` (e.g., GET, POST).
- **Example**: Simple form with a submit button:
  ```html
  <form action="https://localhost:3000/hello" method="get">
      <input type="submit" value="Submit">
  </form>
  ```
- **Complex Form**: Table-based form for user input (e.g., First Name, Last Name, Age, Salary) with JavaScript to save/display data:
  - Inputs: `<input type="text">`, `<input type="number">`.
  - Buttons trigger `saveData()` (stores input in array) and `displayData()` (renders array in a table).

## JavaScript
- **Data Storage**: Use arrays to store user data as objects (e.g., `userData = [{fname, lname, age, salary}]`).
- **DOM Manipulation**: Dynamically create table headers and rows using `createElement` and `appendChild`.
- **JSON Handling**:
  - **Parsing**: `JSON.parse(jsonString)` converts JSON string to JavaScript object.
    - Example: `JSON.parse('{"name":"Bob","age":25}')` → `{name: "Bob", age: 25}`.
  - **Stringifying**: `JSON.stringify(obj)` converts JavaScript object/array to JSON string.
    - Example: `JSON.stringify({name: "Peter", age: 22})` → `'{"name":"Peter","age":22}'`.
  - **Looping**: Use `for...in` to iterate over object keys/values or `forEach` for arrays.
  - **Reviver Function**: Modify values during `JSON.parse` (e.g., double numbers: `JSON.parse('{"p": 5}', (key, value) => typeof value === "number" ? value * 2 : value)`).
  - **Nested Objects**: Handle nested JSON (e.g., `{address: {street, city}}`) with nested loops.
  - **Filtering**: Use `filter` to select specific data (e.g., `users.filter(user => user.city === "Pune")`).

## Fetch API
- **Fetching JSON**:
  - Use `fetch(url)` to retrieve data (e.g., from `https://jsonplaceholder.typicode.com/users`).
  - Handle responses with `.then(response => response.json())` and errors with `.catch`.
  - Display data by creating DOM elements (e.g., `<div>` for each user).
- **Local JSON**:
  - Fetch from local file (e.g., `fetch("./data.json")`) and render in a table.
  - Example data: `[{name: "Yash Somani", age: 24, city: "Pune"}, ...]`.

## CSS
- **Borders**:
  - Properties: `border-[side]-width`, `border-[side]-style`, `border-[side]-color`.
  - Example: `border-top: 2px solid red; border-right: 1px dashed blue;`.
  - Custom borders for elements (e.g., `border-radius: 0px 100% 0 100%` for unique shapes).
- **Layouts**:
  - **Flexbox**: One-dimensional layout (e.g., `display: flex; flex-direction: column;`).
  - **Grid**: Two-dimensional layout for rows and columns.
  - **Positioning**: `absolute`, `relative`, `fixed`, `sticky`.
  - **Float and Clear**: Older layout method, less common.
- **Styling**:
  - Use `box-shadow`, `border-radius`, `background-color`, `linear-gradient` for visual effects.
  - Example: `#d1 { height: 300px; width: 500px; border: 10px solid red; border-radius: 0px 100%; }`.
  - Responsive design with media queries (e.g., `@media screen and (max-width: 700px)`).

## Webpage Structure
- **Portfolio Example**:
  - **Header**: Gradient background, text shadow, and image overlay.
  - **Navbar**: Sticky navigation with hover effects using `::before` pseudo-element.
  - **Container**: Flexbox layout with side (30%) and main (70%) columns.
  - **Footer**: Gradient background and centered text.
  - **Responsive Design**: Adjusts layout for smaller screens using media queries.
  - **Fonts**: Google Fonts (Roboto, Poppins) for typography.
  - **Fake Images**: Styled divs as placeholders (e.g., `class="fakeimg"` with gradient).

## Node.js & Express
- **Setup**:
  - Install Express: `npm install --save express`.
  - Basic server:
    ```javascript
    var express = require("express");
    const app = express();
    app.get("/", (req, res) => res.send("hello"));
    app.listen(200, () => console.log("server running at https://localhost:3000"));
    ```
- **package-lock.json**: Auto-generated, locks package versions for consistency.
- **Version Management**:
  - Use `nvm` to switch Node versions: `nvm install <version>`, `nvm use <version>`.
  - Check/update packages: `npm outdated`, `npm update`.

## Angular
- **Version Management**:
  - Manage dependencies in `package.json`.
  - Install specific versions: `npm install @angular/core@<version>`.
  - Update Angular: `ng update`.

## JSONPlaceholder
- **Description**: Free REST API for testing (https://jsonplaceholder.typicode.com).
- **Endpoints**: `/posts`, `/users`, `/comments`.