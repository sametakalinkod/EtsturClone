import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {

  constructor(private http: HttpClient) {}


  getAllCampaigns():Observable<any[]> {
    return this.http.get<any[]>('/assets/campaigns.json');
  }
  getCampaign(): Observable<any[]>{
    return this.http.get<any[]>('/assets/campaign.json');
  }


}
