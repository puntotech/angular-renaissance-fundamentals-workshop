import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthLogin } from '../../interfaces/auth-login.interface';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  sendRegister = output<AuthLogin>();
  readonly #formBuilder = inject(FormBuilder);
  public message = '';

  public registerForm: FormGroup = this.#formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });


  register() {
    if(this.registerForm.invalid){
      this.message = "Please correct all errors and resubmit the form";
    }else{
      const register: AuthLogin  = this.registerForm.value;
      this.sendRegister.emit(register);
    }
  }
}
