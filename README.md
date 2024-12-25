# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following web:

![TailwindCSS](/docs/05.01-tailwind.gif)


# What is TailwindCSS?

TailwindCSS is a utility-first CSS framework that allows developers to style their applications by using predefined utility classes directly in their HTML. Unlike traditional CSS frameworks, it does not provide pre-designed components but focuses on building styles from the ground up using small, composable utility classes. This approach encourages customization and provides unmatched flexibility when designing user interfaces.

## Advantages of TailwindCSS

1. **Utility-First Design**  
   TailwindCSS provides a wide range of utility classes that let you style your components directly in the markup, reducing the need for writing custom CSS.

2. **Customizability**  
   TailwindCSS allows developers to configure colors, spacing, typography, and other design elements through a `tailwind.config.js` file. This ensures consistency across the application and makes it easy to adhere to design guidelines.

3. **Responsive Design**  
   Built-in support for responsive design enables developers to apply styles based on breakpoints effortlessly, e.g., `md:flex` or `lg:text-lg`.

4. **Faster Development**  
   By using utility classes directly in HTML, you can rapidly prototype and iterate on designs without switching between CSS and HTML files.

5. **Low Specificity and No Dead Code**  
   TailwindCSS uses low-specificity styles, reducing the risk of CSS conflicts. Additionally, it integrates well with tools like `PurgeCSS` to remove unused CSS, resulting in smaller file sizes.

6. **Consistent Styling**  
   All styles are derived from a centralized configuration, ensuring a consistent look and feel throughout the application.

## Combining TailwindCSS with Angular

When used with Angular, TailwindCSS brings additional benefits, enhancing both development experience and performance:

1. **Component-Based Styling**  
   Angular's component-based architecture pairs seamlessly with TailwindCSS's utility classes, enabling localized and modular styling for each component.

2. **Dynamic Class Binding**  
   Angular's powerful templating syntax allows for dynamic class binding, making it easy to conditionally apply TailwindCSS classes based on component logic.

3. **Efficient Integration**  
   Setting up TailwindCSS with Angular requires minimal effort, and it integrates well with Angular CLI, enabling developers to leverage hot reloading for rapid development.

4. **Improved Productivity**  
   The combination of Angular's robust framework and TailwindCSS's rapid styling capabilities results in quicker development cycles and a cleaner separation of concerns.

5. **Theme Customization**  
   Tailwind's customizable design system works perfectly with Angular's theming capabilities, allowing developers to create theme-based applications with ease.

## Getting Started

To use TailwindCSS in your Angular project, follow these steps ([https://tailwindcss.com/docs/guides/angular](https://tailwindcss.com/docs/guides/angular)):

1. Install TailwindCSS and its dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. Initialize TailwindCSS configuration:
   ```bash
   npx tailwindcss init
   ```
3. Configure your template paths. Add the paths to all of your template files in your `tailwind.config.js` file.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        rebeccapurple: 'rebeccapurple',
        grey: 'gray',
      },
    },
  },
  plugins: [],
}
```

4. Update your `src/styles.css` or `src/styles.scss` file with TailwindCSS directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

5. Start using Tailwind's utility classes in your Angular components to style your application effectively.

## Code Setup

1. Install TailwindCSS  
2. Create the shared components for the page; essentially, we will build our layout.  
  - Create the `header` and `footer` components, skipping test files and SCSS, as we will integrate them using TailwindCSS classes.  
     - `ng g c --skip-tests --inline-style shared/components/header`  
     - `ng g c --skip-tests --inline-style shared/components/footer`.  
  - Review the content of the `header` and `footer` to understand what each of the new CSS classes provided by TailwindCSS does.

Header:
```html
<nav class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://youtube.com/c/@DotTechES" class="flex items-center">
    <img src="assets/logo.png" class="h-8 mr-3" alt="DotTech Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap">DotTech</span>
  </a>

  <ul class="font-medium flex flex-row space-x-8">
    <li><a class="text-gray-900" aria-current="page">Home</a></li>
    <li><a class="text-gray-900">New Hero</a></li>
    <li><a class="text-gray-900">Login</a></li>
    <li><a class="text-gray-900">Register</a></li>
  </ul>
</nav>
```

Footer:
```html
<footer class="bg-gray-300">
  <div class="max-w-screen-2xl mx-4 py-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <a href="https://youtube.com/c/@DotTechES" class="flex items-center mb-4 sm:mb-0">
        <img src="assets/logo.png" class="h-8 mr-3" alt="DotTech Logo" />
        <span class="self-center text-2xl font-semibold">DotTech</span>
      </a>
      <span class="text-sm text-gray-800">© 2025-Today!
        <a href="https://youtube.com/c/@DotTechES" class="hover:underline">DotTech</a>. All Rights Reserved.
      </span>
    </div>
  </div>
</footer>
```


## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 501** (`app.component.html`, `app.component.ts`) Include the header and footer components.
- **TODO 502** (`app.component.html`) Remove the `hero-page` class and create the following rules using Tailwind:
   - `grid`: Converts the container into a grid layout, allowing items to be arranged in rows and columns.
   - `min-h-screen`: Sets the minimum height of the container to 100% of the viewport height.
   - `grid-rows-[auto_1fr_auto]`: Defines three rows in the grid:
     - The first row has automatic height (adjusts to the content).
     - The second row takes up the remaining space (1fr).
     - The third row also has automatic height.
   - `grid-cols-2`: Defines the grid to have 2 columns.
   - `max-w-screen-2xl`: Sets a maximum width for the container, equivalent to the "2xl" screen size (around 1536px).
   - `justify-between`: Distributes the items along the main axis (horizontal by default) with the maximum possible space between them.
   - `mx-auto`: Applies automatic margins on the left and right, centering the container horizontally.
   - `p-4`: Applies 1rem (16px) padding on all sides of the container.
- **TODO 503** (`hero-list.component.html`, `hero-list.component.ts`) Remove the `hero-list.component.scss` file.
- **TODO 504** (`hero-item.component.html`, `hero-item.component.ts`) Remove the classes and use tailwindCSS (use the class `btn`, `btn-gray`, `row` and `column` from `src/styles.scss`)
  - Update `the src/styles.scss` file to include the following content (you will be able to use the CSS classes defined in the global file):
```scss
/* You can add global styles to this file, and also import other style files */
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn {
  @apply no-underline bg-gray-200  border cursor-pointer;
  @apply text-gray-800 font-bold text-base font-sans leading-4;
  @apply w-6 py-0.5 px-1.5;
  border-top-color: #CCCCCC;
  border-right-color: #333333;
  border-bottom-color: #333333;
  border-left-color: #CCCCCC;
}
.btn-gray {
  @apply bg-white text-black border-2;
  border-color:  #e7e7e7;
}

.btn-gray:hover {
  background-color: #e7e7e7
}
.btn-blue {
  @apply bg-white text-black border-2;
  border-color: #008CBA;
}

.btn-blue:hover {
  @apply text-white;
  background-color: #008CBA;
}

.row {
  @apply flex;
}
.column {
  @apply flex flex-col p-4
}
```

- **TODO 505** (`hero-item.component.html`) Use [class.text-white] and [class.bg-rebeccapurple] together `isHeroVillain()`.
- **TODO 506**: (`hero-new.component.scss`) Using `@apply` from tailwindCSS, build all the CSS classes. 


Enjoy your coding journey
