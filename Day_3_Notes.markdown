

# Day 3: Web Development Notes
---
## 1. HTML Structure
- **Purpose**: Defines the structure of the web application.
- **Key Components**:
  - **DOCTYPE and HTML Tag**: `<!DOCTYPE html>` declares the document type, and `<html lang="en">` sets the language to English.
  - **Head Section**: Contains metadata, title, external resources (e.g., Tailwind CSS, Google Fonts), and custom styles.
  - **Body Section**: Main content with a responsive layout using Tailwind CSS classes.
  - **Main Container**: Uses `flex flex-col` for a column-based layout with `min-h-screen` to ensure full viewport height.
  - **Header**: Sticky navigation bar with links to different sections (Employee Management, Tools & Widgets, CSS/JS Demos).
  - **Sections**: Three main sections (`#employees`, `#tools`, `#demos`) toggled using JavaScript.
  - **Modals**: Two modals (`add-employee-modal`, `salary-slip-modal`) for adding employees and viewing salary slips.

## 2. CSS Styling
- **Framework**: Uses Tailwind CSS for responsive, utility-first styling (e.g., `bg-white`, `shadow-md`, `px-4`, `flex`).
- **Custom Styles**:
  - **Typography**: Uses Google Fonts (`Inter`) for consistent text styling.
  - **Background**: Light background (`#f8fafc`) for the body.
  - **Animations**:
    - **Equalizer Animation**: Three bars (`bar1`, `bar2`, `bar3`) with different keyframes (`firstBar`, `secondBar`, `thirdBar`) for height changes.
      - Example: `bar1` animates height from 10px to 50px and back.
      - CSS: `animation-duration: 1.2s`, `animation-iteration-count: infinite`.
    - **Bouncing Ball Animation**: A ball (`#bouncing-ball`) moves horizontally with color change using `@keyframes bounce-anim`.
      - From: `background-color: #6366f1`, `transform: translateX(0px)`.
      - To: `background-color: #a78bfa`, `transform: translateX(200px)`.
      - Animation: `animation-duration: 4s`, `animation-iteration-count: infinite`.
  - **Pseudo-Classes**:
    - Applied in `.pseudo-demo-container`:
      - `input:focus`: Changes background (`#e0e7ff`) and border (`2px dashed #4f46e5`) on focus.
      - `a:link`: Unvisited link color (`#6d28d9`).
      - `a:visited`: Visited link color (`#4c1d95`).
      - `a:active`: Active link color (`#c4b5fd`).
      - `a:hover`: Increases font size (`1.1rem`) and adds underline on hover.
      - `tr td:first-child`: Styles first table cell with bold text and color (`#4f46e5`).

### CSS Units
- **Absolute Units** (fixed, do not scale):
  - `px`: Pixels.
  - `pt`: Points (1 pt = 1/72 inch).
  - `cm`: Centimeters.
  - `mm`: Millimeters.
  - `in`: Inches.
  - `pc`: Picas (1 pc = 12 pt).
- **Relative Units** (scale based on other elements or viewport):
  - `em`: Relative to the element’s font size.
  - `rem`: Relative to the root element’s font size.
  - `%`: Percentage relative to parent element.
  - `vw`: 1% of viewport width.
  - `vh`: 1% of viewport height.
  - `vmin`: Smaller of viewport’s height or width.
  - `vmax`: Larger of viewport’s height or width.
  - `ex`: Relative to the x-height of the current font.
  - `ch`: Relative to the width of the “0” character.

## 3. JavaScript Functionality
- **Event Handling**: Uses `DOMContentLoaded` to ensure the DOM is fully loaded before executing scripts.
- **Navigation Logic**:
  - Toggles visibility of sections (`#employees`, `#tools`, `#demos`) based on navigation link clicks.
  - Updates `window.location.hash` and highlights active nav link with `bg-indigo-600` and `text-white`.
  - Uses `showSection` function to manage section visibility and link styling.
- **Employee Management**:
  - **Data**: Stores employee data in an array of objects:
    ```javascript:disable-run
    let employees = [
      { empId: 101, name: "Yash", salary: 52083 },
      ...
    ];
    ```
  - **Render Table**: `renderEmployeeTable()` dynamically populates the employee table with data, including "View Slip" and "Delete" buttons.
  - **Add Employee**: Modal form (`add-employee-modal`) to input `empId`, `name`, and `salary`. Prevents duplicate `empId`.
  - **Delete Employee**: Removes employee from array and re-renders table.
  - **Salary Slip**: Generates detailed salary slip with calculations:
    - Earnings: Base Salary, HRA (50%), CA (3%), CEA (1%), Other Allowance (2%).
    - Deductions: EPF (5%), Income Tax (10%).
    - Net Salary: Total Earnings - Total Deductions.
    - Displayed in `salary-slip-modal` with formatted HTML.
- **Calculator**:
  - Takes two numbers and an operator (`+`, `-`, `*`, `/`) via inputs.
  - Validates inputs and handles division by zero.
  - Displays result in `#calc-result`.
- **Image Slider**:
  - Array of image URLs (`sliderImages`).
  - Displays one image at a time in `#slider-container`.
  - Navigation: `Prev` and `Next` buttons cycle through images using `currentImageIndex`.
  - Add Image: Allows adding new image URLs via input.
- **Bouncing Ball**:
  - On `mouseover`, moves ball to random position within `#ball-container` using `Math.random()` for `top` and `left` styles.
  - Continuous CSS animation (`bounce-anim`) changes position and color.

### JavaScript Arrays and Objects
- **Arrays**:
  - Ordered, indexed collections (e.g., `sliderImages` for image URLs, `employees` for employee data).
  - Methods: `push` (add item), `filter` (remove item), `forEach` (iterate).
  - Example:
    ```javascript
    let sliderImages = ["url1", "url2", ...];
    sliderImages.push(newUrl); // Add new image
    ```
- **Objects**:
  - Key-value pairs for structured data (e.g., employee objects with `empId`, `name`, `salary`).
  - Example:
    ```javascript
    let employee = { empId: 101, name: "Yash", salary: 52083 };
    console.log(employee.name); // Access property
    ```

### JavaScript Function Types
- **Void Functions**: No return value.
  - Example: `void function f1()` (not standard JavaScript syntax; typically just `function f1() {}`).
- **Functions with Return Types**: JavaScript doesn’t explicitly declare return types like `int`, but functions can return values.
  - Example: `function f2() { return 42; }` (returns a number).
- **Parameterized Functions**: Accept arguments.
  - Example: `function f3(x) {}` (JavaScript ignores `void` keyword; `f3(10)` calls with argument `10`).
  - Example: `function f4(x) { return x * 2; }` (returns a number, e.g., `f4(10)` returns `20`).

## 4. CSS Pseudo-Classes and Selectors
- **Pseudo-Classes**: Style elements based on state or position.
  - `:link`: Styles unvisited links.
  - `:visited`: Styles visited links.
  - `:hover`: Styles element on mouse hover.
  - `:active`: Styles element when activated (e.g., clicked).
  - `:focus`: Styles element when it has focus (e.g., input field).
  - `:first-child`: Styles the first child of a parent.
- **Other Pseudo-Classes/Elements**:
  - `:first-line`: Styles the first line of text in an element.
  - `:first-letter`: Styles the first letter of text in an element.
  - `:before`: Inserts content before an element’s content.
  - `:after`: Inserts content after an element’s content.
- **Usage in Code**:
  - Applied in `.pseudo-demo-container` for input focus and link states.
  - Example: `input:focus` changes border and background, `a:hover` increases font size.

## 5. Key Features of the Application
- **Responsive Design**: Uses Tailwind CSS for mobile-friendly layout (e.g., `sm:px-6`, `lg:grid-cols-2`).
- **Interactivity**:
  - Navigation toggles sections without page reload.
  - Employee management with add/delete and salary slip generation.
  - Calculator performs basic arithmetic.
  - Image slider with dynamic image addition.
  - Interactive ball with random movement on hover and continuous animation.
- **Modals**: Popups for adding employees and viewing salary slips with clean, centered design.
- **Error Handling**:
  - Prevents duplicate employee IDs.
  - Validates calculator inputs and division by zero.
  - Displays “No employees found” when the employee list is empty.

---
