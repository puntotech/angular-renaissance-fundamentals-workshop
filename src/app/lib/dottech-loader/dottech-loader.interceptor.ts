import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Subject, debounceTime, finalize, switchMap, tap } from "rxjs";

import { DottechLoaderService } from "./dottech-loader.service";
import { inject } from "@angular/core";

export function dottechLoaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const loaderService = inject(DottechLoaderService);
/*
   OPTION 1: Without debounce
*/
  loaderService.show();
  return next(req).pipe(finalize(() => loaderService.hide()));

  /*
    OPTION 2: With debounce
  */
  /* const loaderSubject = new Subject<boolean>(); // Subject to control the loader

  // 1. Active the loader but with debounce
  loaderSubject.next(true);

  const request$ = next(req).pipe(
    switchMap(() => next(req)), // Run Http request
    debounceTime(300), // Wait 300ms before activating the loader
    tap(() => loaderService.show()), // Active the loader if the request takes more than 300ms
    finalize(() => {
      loaderService.hide(); // hide the loader when the request is finished
      loaderSubject.complete(); // Clean the subject
    })
  );
  return request$; */
}


