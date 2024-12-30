import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

/* TODO 603: Import RouterOutlet to enable routing using router-outlet. Remove unnecessary code in the component after this update. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
<div class="grid min-h-screen grid-rows-[auto_1fr_auto] justify-between mx-auto pt-4">
  <app-header class="col-span-3"/>
  <router-outlet />
  <app-footer class="col-span-3" />
</div>`
})
export class AppComponent {
  title = 'workshop-fundamentals';
}
