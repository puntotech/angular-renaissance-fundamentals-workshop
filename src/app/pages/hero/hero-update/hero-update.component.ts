import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, computed, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
<!-- TODO 616: Add a condition to check if the hero is valid. If it is, display the form. Otherwise, display the app-hero-item-not-found component. !-->
 @if(isValidHero()){
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
 <!-- TODO 613:  Modify the app-hero-form component to accept hero as an input parameter named hero. !-->
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
  readonly #destroyRef = inject(DestroyRef);
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

    updateHero(hero: Hero){
      console.log("Updating Hero", hero);
    /* TODO 715: Update the method update to subscribe to the service and navigate to the home page.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */
      this.#heroService.update(hero).pipe(
        takeUntilDestroyed(this.#destroyRef),
      ).subscribe({
        next: () => this.#router.navigate(['/home']),
        error: (error) => {
          //this.#router.navigate(['/home'])
          alert('Failed to update hero' + error);
        }
      });
    }
}
