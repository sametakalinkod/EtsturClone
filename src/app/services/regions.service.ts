import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class RegionsService {

  constructor(private http: HttpClient) { }

  private readonly regionApiUrl = '/assets/regions.json';

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.regionApiUrl);
  }

}
