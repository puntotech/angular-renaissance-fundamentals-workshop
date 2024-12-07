import { Component } from '@angular/core';
import { HeroListComponent } from './components/hero-list/hero-list.component';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-fundamentals-workshop';
}
