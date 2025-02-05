import { Component, ResourceStatus, computed, effect, inject, signal } from '@angular/core';

import { AuthLogin } from '../../interfaces/auth-login.interface';
import { AuthService } from '../../services/auth.services';
import { HEROES_PAGES } from '../../../heroes/heroes.router';
import { HttpErrorResponse } from '@angular/common/http';
import { NEVER } from 'rxjs';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  template: `
<div class="flex flex-col items-center bg-[#b91d47]">
  <h3 class="text-2xl font-bold text-white">Register Page!</h3>
  <app-register-form (sendRegister)="register($event)" />
  <h3 class="text-white">{{ errorMessage }}</h3>
</div>`,
})
export class RegisterComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  public errorMessage = "";
  readonly registerSignal = signal<AuthLogin>({ username: '', password: '' });
  readonly registerResource = rxResource({
    request: () => this.registerSignal(),
    loader: () => this.#isRegisterEmpty(this.registerSignal()) ? NEVER : this.#authService.register(this.registerSignal()),
  });

  isRegisterResourceCompleted = computed(() => this.registerResource.status() === ResourceStatus.Resolved);

  #isRegisterEmpty(register: AuthLogin): boolean {
    return register.username === '' || register.password === '';
  }

  errorLoginEffect = effect(() => {
    if(this.registerResource.error()){
          this.errorMessage = (this.registerResource.error() as HttpErrorResponse).error.msg;
    }
  });
  navigateEffect = effect(() => {
    if(this.isRegisterResourceCompleted()){
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  });


  register(login: AuthLogin){
    this.registerSignal.set(login);
  }
}
