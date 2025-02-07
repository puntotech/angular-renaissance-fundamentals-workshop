import { Injectable, computed, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DottechLoaderService {
  #isLoading = signal<boolean>(false);
  isLoading = computed(() => this.#isLoading());

  show() {
    this.#isLoading.set(true);
  }

  hide() {
    this.#isLoading.set(false);
  }
}
