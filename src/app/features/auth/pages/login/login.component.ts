import { Component, ResourceStatus, computed, effect, inject, signal } from '@angular/core';

import { AuthLogin } from '../../interfaces/auth-login.interface';
import { AuthService } from '../../services/auth.services';
import { HEROES_PAGES } from '../../../heroes/heroes.router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  template: `
<div class="flex flex-col items-center bg-[cadetblue]">
  <h3 class="text-2xl font-bold text-white">Login Page!</h3>
  <app-login-form (sendLogin)="login($event)" />
  <h3 class="text-white">{{ errorMessage }}</h3>
</div>`,
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  public errorMessage = "";
  readonly loginSignal = signal<AuthLogin>({ username: '', password: '' });
  readonly loginResource = rxResource({
    request: () => this.loginSignal(),
    loader: () => this.#isLoginEmpty(this.loginSignal()) ? NEVER : this.#authService.login(this.loginSignal()),
  });

  isLoginResourceCompleted = computed(() => this.loginResource.status() === ResourceStatus.Resolved);

  errorLoginEffect = effect(() => {
    if(this.loginResource.error()){
       this.errorMessage = (this.loginResource.error() as HttpErrorResponse).error.msg;
    }
  });
  navigateEffect = effect(() => {
    if(this.isLoginResourceCompleted()){
      this.#router.navigate([HEROES_PAGES.HERO]);
    }
  });

  #isLoginEmpty(login: AuthLogin): boolean {
    return login.username === '' || login.password === '';
  }

  login(login: AuthLogin){
    this.loginSignal.set(login);
  }

}
