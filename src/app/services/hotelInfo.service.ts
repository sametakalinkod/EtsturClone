import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class HotelInfoService {

  constructor(private http: HttpClient) { }

  private readonly hotelInfoApiUrl = '/assets/hotelInfo.json';

  getHotelInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.hotelInfoApiUrl);
  }

}
