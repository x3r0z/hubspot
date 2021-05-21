import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class InvoiceService {
  baseUrl = environment.api + 'invoice/';
  constructor(
    private readonly _http:HttpClient
  ) { }

  getAllFromUser(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  getOne(id: string): Observable<any> {
    return this._http.get(this.baseUrl + id);
  }

  create(body: any): Observable<any> {
    return this._http.post(this.baseUrl, body);
  }

  update(id: string, body: any): Observable<any> {
    return this._http.put(this.baseUrl + id, body);
  }

  delete(id: string): Observable<any> {
    return this._http.delete(this.baseUrl + id);
  }
}
