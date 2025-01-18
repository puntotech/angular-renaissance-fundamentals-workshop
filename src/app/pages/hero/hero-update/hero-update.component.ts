import { ActivatedRoute, Router } from '@angular/router';
import { Component, computed, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
 @if(isValidHero()){
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
    <app-hero-form [hero]="hero" (sendHero)="updateHero($event)"></app-hero-form>
</div>
 } @else {
    <app-hero-item-not-found/>
}`
})
export class HeroUpdateComponent {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #heroService = inject(HeroService);
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

  updateHero(hero: Hero){

    console.log("Updating Hero", hero);
    /* TODO 715: Update the method update to subscribe to the service and navigate to the home page.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */
    this.#heroService.update(hero);
    this.#router.navigate(['/home']);
  }
}
