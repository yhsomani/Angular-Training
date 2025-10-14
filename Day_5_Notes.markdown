# Day 5: SASS/SCSS Detailed Notes

## Overview

Day 5 covers SASS (Syntactically Awesome Style Sheets) and SCSS (Sassy Cascading Style Sheets), CSS preprocessors for enhanced styling. Includes setup, syntax, features like variables, nesting, partials, imports, mixins, functions, interpolation, @extend, inheritance, differences between SASS and SCSS, file organization, compilation, and integration with HTML/JS. Examples from assignments and samples demonstrate practical use. Dynamic scripting via JS is shown in form generation.

## 1. Introduction to SASS/SCSS

- SASS: CSS preprocessor adding power to CSS.
- SCSS: Subset of SASS, CSS-superset syntax with braces/semicolons.
- Benefits: Reusability, modularity, maintainability for large projects.
- Compilation: Converts to standard CSS.
- Installation: `npm install -g sass` for global; `npm i sass -d` for project.
- Commands:
  - Compile: `sass input.sass output.css`.
  - Watch: `sass --watch input.sass:output.css` for live updates.

## 2. SASS vs SCSS

- **SASS (.sass)**: Indentation-based, no braces/semicolons. Strict structure.
  - Example:
    ```
    $primary-color: blue
    button
      color: $primary-color
      border: 2px solid $primary-color
    ```
- **SCSS (.scss)**: CSS-like with braces/semicolons. Easier for CSS users.
  - Example:
    ```scss
    $primary-color: blue;
    button {
      color: $primary-color;
      border: 2px solid $primary-color;
    }
    ```
- Both compile to CSS. SASS is more concise; SCSS is compatible with CSS.

## 3. Basic Syntax

- Superset of CSS: Valid CSS works in SCSS.
- Selectors, properties same as CSS.
- Comments: `//` for single-line (not in output CSS).
- Example from sample:
  ```scss
  .text {
    color: blue;
    font-size: 20px;
  }
  ```

## 4. Variables

- Declare with `$`: Store reusable values (colors, fonts, sizes).
- Scope: Global or local.
- Default values possible.
- Example:
  ```scss
  $primary-color: #bf092f;
  body {
    background-color: $primary-color;
  }
  ```
- From assignment1: `$primary-color: #BF092F` used in body background.

## 5. Nesting

- Mirror HTML hierarchy: Nest selectors inside parents.
- Reduces repetition, improves readability.
- Use `&` for parent reference (e.g., hover states).
- Example:
  ```scss
  nav {
    background: #333;
    ul {
      list-style: none;
      li {
        display: inline-block;
      }
    }
  }
  ```
- From assignment1:
  ```sass
  ul
    list-style-type: none
    display: flex
    background-color: #132440
    justify-content: space-evenly
    height: 30px
    margin: 0
    padding-left: 200px
    padding-right: 200px
  li
    line-height: 30px
    font-weight: bold
    cursor: pointer
  ```

## 6. Partials and Imports

- Partials: Files starting with `_` (e.g., `_base.sass`), not compiled alone.
- Import: `@import 'filename';` (no extension needed).
- Merges content into main file.
- Example:
  ```sass
  @import "sample"
  ```
- From assignment1: `_sample.sass` imported into `index.sass`.
- Benefits: Modular code organization.

## 7. Mixins and @include

- Mixins: Reusable code blocks, like functions.
- Define: `@mixin name($param1, $param2: default) { ... }`.
- Include: `@include name(value1, value2);`.
- Parameterized for flexibility.
- Example from \_sample.sass:
  ```sass
  @mixin MyUi($color, $width)
    border: $width solid $primary-color
  .button
    @include MyUi(black, 2px)
  ```
- Another:
  ```sass
  @mixin myHelloText
    font-family: Georgia, 'Times New Roman', Times, serif
    justify-content: space-evenly
    text-align: center
  nav
    @include myHelloText
  ```

## 8. Interpolation

- Dynamically insert values into selectors/properties using `#{}`.
- Useful for variable property names.
- Example from index.sass:
  ```sass
  @mixin interpolation ($changable, $val, $val2, $prop1, $prop2)
    background-#{$changable}: $val
    position: $val
    #{$prop1}: 0px
    #{$prop2}: 0px
  .blockarea
    @include interpolation ("image" , url("img.png") , absolute , top , right )
  .blockarea2
    @include interpolation ("color" , lightgray , absolute , top , left )
  ```

## 9. Functions

- Custom: `@function name($args) { @return value; }`.
- Built-in: Math, color manipulation.
- Example:
  ```scss
  @function calculate-width($size) {
    @return $size * 2;
  }
  div {
    width: calculate-width(100px); // 200px
  }
  ```

## 10. @extend and Inheritance

- Inherit styles from another selector.
- Reduces duplication.
- Example:
  ```scss
  .button {
    padding: 10px;
  }
  .primary-button {
    @extend .button;
    background: blue;
  }
  ```
- Compiles to shared selectors.

## 11. @import vs @use

- **@import**: Merges files, can duplicate styles, no namespaces. Deprecated.
  - Example: `@import 'base';`.
  - Limitations: Multiple loads, potential duplication.
- **@use**: Loads once, namespaces, encapsulation.
  - Example: `@use 'base';`.
  - Benefits: Prevents conflicts, modern practice.
- From sample: `@use "base"` in SampleSASS.sass.

## 12. Animations and Keyframes

- Define: `@keyframes name { 0% { ... } 100% { ... } }`.
- Use in selectors.
- Example from SampleSASS.sass:
  ```sass
  @keyframes myAnimation
    0%
      width: 100px
    100%
      width: 200px
  .description .btn:hover
    animation: myAnimation 2s ease-in-out forwards
    background-color: orange
  ```

## 13. Project Setup and Structure

- Folders: `/scss` for source, `/css` for output.
- Main file imports partials.
- 7-1 Pattern: Folders like `base/`, `components/`, `layouts/`, `utils/`.
- Example structure:
  - `_base.scss`: Resets, typography.
  - `_variables.scss`: Globals.
  - `_mixins.scss`: Reusables.
  - `style.scss`: `@import` all.
- Vite Integration: `npm create vite@latest`, add `sass` dependency, import in JS.

## 14. Compilation and Maps

- Outputs `.css` and `.css.map` for debugging.
- From files: Source maps link back to SASS/SCSS.

## 15. Integration with HTML/JS

- Link compiled CSS: `<link rel="stylesheet" href="index.css" />`.
- Dynamic JS: Assignment2 – Form builder using JS to add inputs dynamically.
  - Example Script:
    ```js
    addButton.onclick = function () {
      const selectedType = formType.value;
      const labelText = prompt("Enter label text:");
      // Create row, cells, input...
    };
    ```
- Styling with SASS: Variables for colors, lighten functions (e.g., `lighten($primary-color, 30%)`).

## 16. Roadmap Concepts (from Assignment3)

- Environment: VS Code, Node.js.
- Compiler Tools: Node-Sass, Dart Sass, extensions.
- Modularity: Partials for organization.
- Real Project: Plan structure, use variables/mixins, automate with watch.
- Organizing: Focused files (e.g., `_header.scss`).

## 17. Examples from Files

- Assignment1: Flex layout for cards, image styling, navigation bar.
- Assignment2: Form elements, table styling with shadows.
- Assignment3: Accordion-style roadmap with details/summary.
- SASS Sample: Text, button, animation on hover.
- SCSS Sample: Similar, with nesting using `&`.
- Vite App: Navigation mixin for layout.

## 18. Additional Notes

- Parent Selector: `&` for pseudo-classes, child refs.
- Dynamic Scripts: JS for interactivity (e.g., form generation).
- No Internet in Code Exec: Relevant for tools, but not here.
- Ensure Compatibility: SCSS fully CSS-compatible.
