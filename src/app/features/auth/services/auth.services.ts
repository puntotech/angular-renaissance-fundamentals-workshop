import { Injectable, inject } from "@angular/core";

import { AuthLogin } from "../interfaces/auth-login.interface";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_ENDPOINT = "http://localhost:9000/user";
  private readonly httpClient = inject(HttpClient);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/login`, user);
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/register`, user);
  }
}
