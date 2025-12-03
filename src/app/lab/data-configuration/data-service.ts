import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpService,
  ) { }

  /**
   * Sends a GET request to the specified route.
   *
   * @param route - The API endpoint to send the GET request to.
   * @param authRequired - Optional flag indicating whether authentication is required for the request. Defaults to false.
   * @returns An Observable emitting the response object from the GET request.
   */
  get(route: string, authRequired: boolean = false): Observable<object> {
    return this.http.get(route, authRequired);
  }

  /**
   * Sends a POST request to the specified route with provided data.
   *
   * @param route - The API endpoint to send the POST request to.
   * @param data - The payload to send in the POST request.
   * @param authRequired - Optional flag indicating whether authentication is required for the request. Defaults to false.
   * @returns An Observable emitting the response object from the POST request.
   */
  post(route: string, data: any, authRequired: boolean = false): Observable<object> {
    return this.http.post(route, data, authRequired);
  }

  /**
   * Sends a PUT request to the specified route with provided data.
   *
   * @param route - The API endpoint to send the PUT request to.
   * @param data - The payload to send in the PUT request.
   * @param authRequired - Optional flag indicating whether authentication is required for the request. Defaults to false.
   * @returns An Observable emitting the response object from the PUT request.
   */
  put(route: string, data: any, authRequired: boolean = false): Observable<object> {
    return this.http.put(route, data, authRequired);
  }

  /**
   * Sends a DELETE request to the specified route.
   *
   * @param route - The API endpoint to send the DELETE request to.
   * @param authRequired - Optional flag indicating whether authentication is required for the request. Defaults to false.
   * @returns An Observable emitting the response object from the DELETE request.
   */
  delete(route: string, authRequired: boolean = false): Observable<object> {
    return this.http.delete(route, authRequired);
  }
}
