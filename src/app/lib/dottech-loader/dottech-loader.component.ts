import { Component, inject } from '@angular/core';

import { DottechLoaderService } from './dottech-loader.service';

@Component({
  selector: 'dottech-loader',
  template: `
@if(isLoading()){
<div class="grid h-screen fixed right-8 z-50">
  <div class="place-self-end loader"></div>
</div>
}`,
  styles: `
.loader{
  @apply border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600
}`
})
export class DottechLoaderComponent {
  isLoading = inject(DottechLoaderService).isLoading;
}
