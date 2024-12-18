# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following component:

![Reactive Form](/docs/03.02-form-new-error-solved.gif)

**Note: At the time this tutorial/workshop was developed, the forms API did not yet support signals. Therefore, it was implemented using the older API. However, the update will be straightforward. When that time comes, this repository/tutorial/workshop will be updated (or you can submit a Pull Request).**

## Angular Form Control State

The states of Angular form controls describe the status of a form control in Angular forms.

| STATE      | DETAILS                                                                                              | CSS-Class       |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------- |
| Pristine   | The user has not modified the control                                                               | `.ng-pristine`  |
| Dirty      | The user has modified the control                                                                   | `.ng-dirty`     |
| Touched    | The user has interacted with the control, e.g., `clicking` or `focusing`                            | `.ng-touched`   |
| Untouched  | The user has not interacted with the control                                                        | `.ng-untouched` |
| Valid      | The form control's value matches the validation rules defined in the application                    | `.ng-valid`     |
| Invalid    | The form control's value does not match the validation rules defined in the application             | `.ng-invalid`   |

![Pritine & Dirty](docs/forms/03.02-forms-state-pristine-dirty.png)
![Touch & Untouch](docs/forms/03.02-forms-state-touch-untouch.png)
![Valid & Invalid](docs/forms/03.02-forms-state-valid-invalid.png)


Official documentation:

- [Documentación de Reactive Forms](https://angular.dev/guide/forms)


## Code Setup

1. Create a new `hero-name-validator` validator, which should be located in the `shared/validators/` directory.

```typescript
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";

const INVALID_NAME = ["lovelace", "hopper", "ritchie", "hamilton", "knuth"];

export const heroNameValidator: AsyncValidatorFn = async (control: AbstractControl): Promise<ValidationErrors | null> => {
  const forbidden = INVALID_NAME.includes(control.value.toLowerCase());
  return forbidden ? { heroNameValid: { value: control.value } }: null;
};
```

2. Modify the `heroForm` form by adding the new validator to the `FormControl` named `name` as shown:"

```typescript
  heroForm: FormGroup = this.#formBuilder.group({
    name: ['Joker', Validators.required, heroNameValidator],
    image: ["https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"],
    alignment: ["bad"],
    powerstats: this.#formBuilder.group({
      intelligence: [100, [Validators.required, Validators.max(100), Validators.min(0)]],
      strength: [10, [Validators.required, Validators.max(100), Validators.min(0)]],
      speed: [12, [Validators.required, Validators.max(100), Validators.min(0)]],
      durability: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
      power: [43, [Validators.required, Validators.max(100), Validators.min(0)]],
      combat: [70, [Validators.required, Validators.max(100), Validators.min(0)]],
    })
  });

```

3.Add the `.error` CSS class to the `hero-new.component.scss` file, ensuring it only changes the text color to red:

```scss
.error {
  color:red;
}
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 311** (`hero.new.component.html`) Add a `div` element with the class `error` only if the `formControlName` `name` is in the `dirty` state and also `invalid`.  
- **TODO 312** (`hero.new.component.html`) Add a `div` displaying the following message `<div>* Hero name is required</div>` if the `name` control error is `required`.  
- **TODO 313** (`hero.new.component.html`) Add a `div` displaying the following message `<div>* Hero name must be a valid name</div>` if the `name` control error is `heroNameValid`.  
- **TODO 314** (`hero.new.component.html`) Add the `div` with the `error` class only if the `formControlName` `combat` within the `FormGroup` `powerstats` is in the `dirty` state and also `invalid`.  
- **TODO 315** (`hero.new.component.html`) Add a `div` displaying the message `* Combat is required` if the `combat` control error is `required`.  
- **TODO 316** (`hero.new.component.html`) Add a `div` displaying the message `* Combat must be a value between 0 and 100` if the `combat` control error indicates the value is not between `0` and `100`.
Enjoy your coding journey
