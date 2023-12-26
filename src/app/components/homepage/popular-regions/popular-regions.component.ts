import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaigns.service';
import { RegionsService } from '../../../services/regions.service';

@Component({
  selector: 'app-popular-regions',
  templateUrl: './popular-regions.component.html',
  styleUrls: ['./popular-regions.component.scss']
})
export class PopularRegionsComponent implements OnInit{

  constructor(private regionService:RegionsService){
  
  }
  regions:any[]=[];

  regionName:string []=["Antalya","Alanya","Ayvalık","Kemer","Kuşadası","Asos","Belek","Bodrum","Bozcaada","Bursa","Çeşme"]
  
  ngOnInit(): void {
   
  this.getRegionImg();
  }

  getRegionImg(){
    this.regionService.getRegions().subscribe((res:any)=>{
     this.regions=res;
     
    })
  }
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const scrollSlider=document.querySelector('.scrollMobile');
    event.deltaX > 0 ? scrollSlider!.scrollLeft+=30 : scrollSlider!.scrollLeft-=30
  }
}
