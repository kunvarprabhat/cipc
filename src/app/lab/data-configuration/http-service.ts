import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { loadingservice } from '../../Services/shared-service/loading-service';
import { appconfiguration } from './appconfiguration';
import { ApplicationUser } from '../../Services/shared-service/application-user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private config: appconfiguration,
    private _loader: loadingservice,
    private userServise: ApplicationUser
  ) { }

   /**
   * Sends a GET request to the specified route.
   *
   * @param route - The API endpoint route to send the request to.
   * @param authRequired - Whether authentication headers should be included in the request. Defaults to false.
   * @returns An Observable emitting the response object from the GET request.
   */
  get(route: string, authRequired: boolean = false): Observable<object> {
    const url = `${this.config.getApiUrl()}${route}`;
    this._loader.show();
    return this.http.get(url, { headers: this.buildHeaders(authRequired) }).pipe(
      finalize(() => this._loader.hide())
    );
  }

  /**
    * Sends a POST request to the specified route with the provided data.
    *
    * @param route - The API endpoint route to send the request to.
    * @param data - The payload to send in the POST request.
    * @param authRequired - Whether authentication headers should be included in the request. Defaults to false.
    * @returns An Observable emitting the response object from the POST request.
    */
  post(route: string, data: any, authRequired: boolean = false): Observable<object> {
    const url = `${this.config.getApiUrl()}${route}`;
    this._loader.show();
    return this.http.post(url, data, { headers: this.buildHeaders(authRequired) }).pipe(
      finalize(() => this._loader.hide())
    );
  }

  /**
    * Sends a PUT request to the specified route with the provided data.
    *
    * @param route - The API endpoint route to send the request to.
    * @param data - The payload to send in the PUT request.
    * @param authRequired - Whether authentication headers should be included in the request. Defaults to false.
    * @returns An Observable emitting the response object from the PUT request.
    */
  put(route: string, data: any, authRequired: boolean = false): Observable<object> {
    const url = `${this.config.getApiUrl()}${route}`;
    this._loader.show();
    return this.http.put(url, data, { headers: this.buildHeaders(authRequired) }).pipe(
      finalize(() => this._loader.hide())
    );
  }

  /**
   * Sends a DELETE request to the specified route.
   *
   * @param route - The API endpoint route to send the request to.
   * @param authRequired - Whether authentication headers should be included in the request. Defaults to false.
   * @returns An Observable emitting the response object from the DELETE request.
   */
  delete(route: string, authRequired: boolean = false): Observable<object> {
    const url = `${this.config.getApiUrl()}${route}`;
    this._loader.show();
    return this.http.delete(url, { headers: this.buildHeaders(authRequired) }).pipe(
      finalize(() => this._loader.hide())
    );
  }
 // Helper: Build headers synchronously with optional Bearer token
  private buildHeaders(authRequired: boolean = false): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (authRequired) {
      const bearerToken = this.userServise.getToken();
      headers = headers.set('Authorization', `Bearer ${bearerToken}`);
    }
    return headers;
  }

}
