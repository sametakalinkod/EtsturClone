import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HotelsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'assets/hotels.json';

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //burada rxjs ile veri akışı olan bir nesne üzerinden pipe ile bağlanıp map(elemanlar üzerinden bir dönüşüm gerçekleştirmeye yarar.) ile de istenen dönüşümü yaptık
  //burada veri akışına abone olup yani gelen otel listesini hotels'i alarak, find ile eşleşen hotelId ye uygun oteli bulup observable nesnesine dönüştürerek çağırıldığı yere geri döner. 
  getHotelById(hotelId: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        //   map((hotels: any[]) =>  ile hotels dizisindeki her öğe üzerinde işlem yapar.
        map((hotels: any[]) => hotels.find((hotel: { hotelId: string; }) => hotel.hotelId === hotelId))
      );
  }

}
