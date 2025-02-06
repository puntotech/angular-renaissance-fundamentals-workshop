import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AUTH_PAGES } from '../../../features/auth/auth.routes';
import { HEROES_PAGES } from '../../../features/heroes/heroes.router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  navigation = {
    home: [HEROES_PAGES.HERO, HEROES_PAGES.HOME],
    heroNew: [HEROES_PAGES.HERO, HEROES_PAGES.NEW],
    login: [AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN],
    register: [AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER],
  }
  readonly #tokenStorageService = inject(TokenStorageService);
  readonly #router = inject(Router);
  isLogin = this.#tokenStorageService.isLogin;

  logout(){
    const isSure = window.confirm('Are you sure?');
    if(isSure){
      this.#tokenStorageService.logout();
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  }
}
