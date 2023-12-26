import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchSectionComponent } from './common/search-section/search-section.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';

const routes: Routes = [

  //{ path: "", redirectTo: 'homepage', pathMatch: 'full' },

  {
    path: "homepage", component: HomepageComponent, children: [
      {
        path: "campaigns", loadChildren: () => import("./components/homepage/campaigns/campaigns.module")
          .then(module => module.CampaignsModule)
      },
      {
        path: "footer-info", loadChildren: () => import("./components/homepage/footer-info/footer-info.module")
          .then(module => module.FooterInfoModule)
      },
      {
        path: "holiday-themes", loadChildren: () => import("./components/homepage/holiday-themes/holiday-themes.module")
          .then(module => module.HolidayThemesModule)
      },
      {
        path: "popular-regions", loadChildren: () => import("./components/homepage/popular-regions/popular-regions.module")
          .then(module => module.PopularRegionsModule)
      },
      {
        path: "search", loadChildren: () => import("./components/homepage/search/search.module")
          .then(module => module.SearchModule)
      },
    ]
  },

  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "searchSection", component: SearchSectionComponent },
  { path: "hotels", component: HotelsComponent },
  { path: 'hotel-detail/:hotelId', component: HotelDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
