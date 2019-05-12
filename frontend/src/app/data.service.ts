import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = environment.baseUrl;
  API_ENDPOINT = '/shareHolding/';

  constructor(private _http: HttpClient) { }

  /**
   * Get data in a list
   */
  list(tickerId: string, startDate: string, endDate: string): Observable<any> {
    return this._http.get<any[]>(this.API_URL + this.API_ENDPOINT +
      `${tickerId}\\${startDate}\\${endDate}`);

  }
}
