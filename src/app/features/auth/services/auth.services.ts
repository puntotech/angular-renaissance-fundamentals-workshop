import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

import { AuthLogin } from "../interfaces/auth-login.interface";
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from "../../../shared/services/token-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #API_ENDPOINT = "http://localhost:9000/user";
  readonly #httpClient = inject(HttpClient);
  readonly #tokenStorageService = inject(TokenStorageService);

  login(user: AuthLogin): Observable<{ token: string }> {
    return this.#httpClient.post<AuthLogin>(`${this.#API_ENDPOINT}/login`, user)
    .pipe(
      map((resp: any) => {
        this.#tokenStorageService.token = resp.token;
        return resp;
      }));
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(`${this.#API_ENDPOINT}/register`, user);
  }
}
