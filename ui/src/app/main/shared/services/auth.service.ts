import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  redirectUrl: string = '';
  baseUrl = environment.api + 'auth/';
  constructor(
    private readonly _http:HttpClient
  ) { }

  getItem(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  setItem(name: string, value: string): void {
    sessionStorage.setItem(name, value);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('accessToken') !== null;
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}login`, {username, password});
  }

  register(body: any): Observable<any> {
    return this._http.post(`${this.baseUrl}register`, body);
  }

  logout(): void {
    sessionStorage.clear()
  }
}
