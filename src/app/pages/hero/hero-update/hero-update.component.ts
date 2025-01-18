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
  readonly #destroyRef = inject(DestroyRef);
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

    updateHero(hero: Hero){
      console.log("Updating Hero", hero);

      this.#heroService.update(hero).pipe(
        takeUntilDestroyed(this.#destroyRef),
      ).subscribe({
        next: () => this.#router.navigate(['/home']),
        error: (error) => alert('Failed to update hero' + error)
      });
    }
}
