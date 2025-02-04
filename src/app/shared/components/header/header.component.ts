import { AUTH_PAGES } from '../../../features/auth/auth.router';
import { Component } from '@angular/core';
import { HEROES_PAGES } from '../../../features/heroes/heroes.router';
import { RouterLink } from '@angular/router';

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
}
