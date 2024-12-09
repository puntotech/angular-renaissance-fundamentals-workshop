# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following component:

![Reactive Form](/docs/03.01-form-new-solved.gif)

## Reactive Form

Angular provides two different approaches to handling user input through forms: 

1. Reactive. 
2. Template-driven.
   
Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

Official documentation:

- [Documentación de Reactive Forms](https://angular.dev/guide/forms)

## Code Setup

1. Create a new `hero-new` component, which should be located in the `components/hero-new/` directory. Execute the following command:
  - `ng g c components/hero-new`. This command uses the options `g` (generate) and ``c (component), followed by the component path `components/hero-new`. The default name for the component is `hero-new`.
The content of the template should be as follows:

```html
<h3>Add an Hero!</h3>

<div>
  <h4 class="error">{{ message }}</h4>
  <!--
    TODO 303: Add an `(ngSubmit)` event to the `form` tag to invoke the `addHero` method on submit, and bind the associated `formGroup` to the `heroForm` attribute.
   -->
  <form>
    <div class="row">
      <div class="column">
        <div class="input-group">
          <label for="name">Name: </label> 
          <!-- TODO 304: Add the `formControlName` for the input element to bind it to the `name` controller. -->
          <input type="text" name="name" placeholder="Name" required />
        </div>
        <!-- TODO 305: Add the `formGroupName` `powerstats` to the `div` element and the `formControlName` bindings for the different skills to their respective `input` elements. -->
        <div>
          <div class="input-group">
            <label for="combat">Combat: </label>
            <input type="number" name="combat" placeholder="Combat" />
          </div>
          <div class="input-group">
            <label for="durability">Durability </label>
            <input type="number" name="durability" placeholder="Durability" />
          </div>
          <div class="input-group">
            <label for="intelligence">Intelligence: </label>
            <input
              type="number"
              name="intelligence"
              placeholder="Intelligence"
            />
          </div>
          <div class="input-group">
            <label for="power">Power: </label>
            <input type="number" name="power" placeholder="Power" />
          </div>
          <div class="input-group">
            <label for="speed">Speed: </label>
            <input type="number" name="speed" placeholder="Speed" />
          </div>
          <div class="input-group">
            <label for="strength">Strength: </label>
            <input type="number" name="strength" placeholder="Strength" />
          </div>
        </div>
        <!-- TODO 306: Add the `formControlName` bindings for `image` and `alignment`.  -->
        <div class="input-group">
          <label for="image">Image: </label>
          <select formControlName="image">
            <option
              value="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"
              selected
            >
              Joker
            </option>
            <option
              value="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/87-bionic-woman.jpg"
            >
              Bionic Woman
            </option>
            <option
              value="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/165-catwoman.jpg"
            >
              Cat Woman
            </option>
            <option
              value="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/332-hulk.jpg"
            >
              Hulk
            </option>
            <option
              value="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg"
            >
              Superman
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="alignment">Alignment: </label>
          <select>
            <option value="good" selected>Good</option>
            <option value="bad">Bad</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <button>Create</button>
    </div>
  </form>
</div>
```

2. The necessary styles for the form must be added to the file `/components/hero-new/hero-new.component.scss` and are as follows:

```scss
h3 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  background-color: beige;
  border-radius: 3px;
  padding: 1em;

  .input-group {
    display: flex;
  }
  .input-group > label {
    margin-right: 1em;
    padding: .5em 0;
  }

  label {
    min-width: 35%;
    font-weight: bolder;
    font-size: 1.25rem;
  }
  input,
  select {
    flex: 6;
    min-width: 65%;
    padding: .5em;
    margin-bottom: 1em;
  }
  button {
    padding: 1em;
    background: gray;
    color: white;
    border: 0;
    cursor: pointer;
  }
  fieldset {
    border: 0;
  }
}
.row {
  display: flex;
}
.column {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
```

3. The content of `hero-new.component.ts` should initially be as follows. Here, you'll find the exercises to develop. So, copy this content and start from there.

```typescript
import { Component, output } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-hero-new',
  imports: [],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  add = output<Hero>();
  /* TODO 301: Inject the `FormBuilder` service into a private, readonly attribute called `formBuilder`. */
  message = "";

  /* TODO 302: Create an attribute named `heroForm` of type `FormGroup`, initialized using `formBuilder` with the controls described in the code.

    name: 'Joker', required
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"
    alignment: "bad"
    powerstats: This is a `FormGroup`:
      intelligence: 100, required, min 0 y max 100
      strength: 10, required, min 0 y max 100
      speed: 12, required, min 0 y max 100
      durability: 60, required, min 0 y max 100,
      power: 43, required, min 0 y max 100
      combat: 70, required min 0 y max 100
  */

  addHero(){
  /* TODO 302: Uncomment the `addHero` method code in the `hero-new.component.ts` component. */
/*     if (this.heroForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const hero: Hero = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...this.heroForm.value,
        powerstats: {...this.heroForm.value.powerstats },
      };
      console.log("Creating Hero", hero);
      this.add.emit(hero);
    } */
  }
}
```

4. Now we need to update our main component `app.component.html` so that our page consists of the `HeroListComponent` on one side and the `HeroNewComponent` form on the other. Therefore, the content of the `app.component.html` file is as follows:

```html
<div class="hero-page">
  <app-hero-list [heroes]="heroes" />
  <app-hero-new (add)="addHero($event)"/>
</div>
```

5. The next step is for the `AppComponent` to import the `HeroListComponent` and `HeroNewComponent` components, with the content of the `app.component.ts` file as follows:

```typescript
import { Component } from '@angular/core';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-fundamentals-workshop';
  /* TODO 300: Move the `heroes` property from `HeroListComponent` to `AppComponent`. */

  /* TODO 300: Create the method `addHero` which add an hero to heroes array. */
  addHero(hero: Hero){
    
  }
}
```

6. Finally, we need to position each component on one side of the page, and for this, we add the necessary CSS rules in the `app.component.scss` file.
   
```scss
.hero-page {
  display: flex;
  gap: 2rem;

  app-hero-list {
    width: 70%;
  }
  app-hero-new {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    width: 25%;
  }
}
```
   

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 300** (`hero-list.component.ts`) Transform the `heroes` attribute to be an `input.required<Hero[]>()` coming from `AppComponent`.
  - (`app.component.ts`) Move the `heroes` property from `HeroListComponent` to `AppComponent`.
  - (`app.component.ts`) Create the method `addHero` which add an hero to heroes array.
  - (`hero-list.component.html`) Update the control-flow to use a signal.
  - Import the `ReactiveFormsModule` module into the `hero-new.component.ts` component.
- **TODO 301** (`hero-new.component.ts`) Inject the `FormBuilder` service into a private, readonly attribute called `formBuilder`.
- **TODO 302** (`hero-new.component.ts`) Create an attribute named `heroForm` of type `FormGroup`, initialized using `formBuilder` with the controls described in the code.
  - Uncomment the `addHero` method code in the `hero-new.component.ts` component.
- **TODO 303** (`hero-new.component.html`) Add an `(ngSubmit)` event to the `form` tag to invoke the `addHero` method on submit, and bind the associated `formGroup` to the `heroForm` attribute.
- **TODO 304** (`hero-new.component.html`) Add the `formControlName` for the input element to bind it to the `name` controller.
- **TODO 305** (`hero-new.component.html`) Add the `formGroupName` `powerstats` to the `div` element and the `formControlName` bindings for the different skills to their respective `input` elements.
- **TODO 306** (`hero-new.component.html`) Add the `formControlName` bindings for `image` and `alignment`.

Enjoy your coding journey
