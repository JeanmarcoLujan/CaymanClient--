import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaymanAPIService {

  private _refeshrequired = new Subject<void>();

  get requiredRefresh(){
    return this._refeshrequired;
  }

  constructor(private http: HttpClient) { }

  post<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.post<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  postInModal<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.post<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      }).pipe(
        tap(()=>{
          this.requiredRefresh.next();
        })
      );
  }


  put<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.put<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  putInModal<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.put<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      }).pipe(
        tap(()=>{
          this.requiredRefresh.next();
        })
      );
  }

  getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    return httpHeaders;
  }

  getById(url: string): Observable<any[]> {
    return this.http.get<any>(url);
  }

  getAll(url: string): Observable<any[]> {
    return this.http.get<any>(url);
  }

  delete<T>(url: string): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.delete<T>(url,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }


}
