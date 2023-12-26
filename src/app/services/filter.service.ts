
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilterService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = '/assets/filterOption.json';

  getFilters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
