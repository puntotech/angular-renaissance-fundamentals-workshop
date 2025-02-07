import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

import { TokenStorageService } from "../services/token-storage.service";
import { inject } from "@angular/core";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
  const tokenStorageService = inject(TokenStorageService);

  if(tokenStorageService.token){
    console.log('TokenInterceptor token:', tokenStorageService.token);

    req = req.clone({
      headers: req.headers.set("Autorization", `Bearer ${tokenStorageService.token}`),
    });
  }
  return next(req);
}
