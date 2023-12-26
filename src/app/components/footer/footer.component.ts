import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerInfos: any[] = [];

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.getFooterInfos();
  }

  getFooterInfos() {
    this.footerService.getFooterItems().subscribe((datas: any) => {
      this.footerInfos = datas;
    });
  }

  toggleItems(items: any) {
    items.isVisible = !items.isVisible;
  }
}
