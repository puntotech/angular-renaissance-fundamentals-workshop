import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthLogin } from '../../interfaces/auth-login.interface';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  sendLogin = output<AuthLogin>();
  readonly #formBuilder = inject(FormBuilder);
  public message = "";

  public loginForm: FormGroup =  this.#formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    if(this.loginForm.invalid){
      this.message = "Please correct all errors and resubmit the form";
    }else{
      const login: AuthLogin = this.loginForm.value;
      this.sendLogin.emit(login);
    }
  }
}
