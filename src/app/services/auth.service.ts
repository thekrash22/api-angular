import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from "../interface/auth.interface";
import { environment } from "@env/_file";

const AUTH_URL = environment.url+'login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string | undefined, password: string | undefined): Observable<LoginResponse> {
    const url = AUTH_URL;
    const data = { email, password };
    return this.http.post<LoginResponse>(url, data).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  logout(): void {
    this.setToken('');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
