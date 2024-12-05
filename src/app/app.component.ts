import { Component } from '@angular/core';
import { HeroItemComponent } from './components/hero-item/hero-item.component';

@Component({
  selector: 'app-root',
  imports: [HeroItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-fundamentals-workshop';
}
