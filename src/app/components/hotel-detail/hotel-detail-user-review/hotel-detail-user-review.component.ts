import { Component, Input, OnInit } from '@angular/core';
import { HotelReviewsService } from 'src/app/services/hotelReviews.service';
import { MobileUserReviewsComponent } from './mobile-user-reviews/mobile-user-reviews.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-detail-user-review',
  templateUrl: './hotel-detail-user-review.component.html',
  styleUrls: ['./hotel-detail-user-review.component.scss']
})
export class HotelDetailUserReviewComponent implements OnInit {

  @Input() hotel: any | undefined;
  hotelReviews: any[] = [];
  selectedHotels: any;
  selectedCategory: string = 'Tüm Yorumlar';
  isShow:boolean=false
  ngOnInit(): void {
    this.getHotelReview();
    this.selectedHotel();
  }

  constructor(
    private hotelReviewService: HotelReviewsService,
    private modalService: NgbModal) 
    {
 }
  getHotelReview() {
    this.hotelReviewService.gethotelReviews().subscribe((data: any) => {
      this.hotelReviews = data;
      this.selectedHotel();
      this.showReview(this.selectedCategory);
    });
  }


  showReview(reviewCategory: string): void {
    this.selectedCategory = reviewCategory;
  }

  selectedHotel() {
    this.selectedHotels = this.hotelReviews.filter((datas: any) => {
      return datas.hotelReviewId === this.hotel.hotelId;
    });

    if (this.selectedHotels.length > 0) {
      console.log("Selected hotels information: ", this.selectedHotels);
    } else {
      console.log("No matching hotels found.");
    }
  }

  calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }


  calculateAverageRatingForCategory(reviews: any[]): number {
    let selectedCategoryReviews;

    switch (this.selectedCategory) {
      case 'Tüm Yorumlar':
        selectedCategoryReviews = this.selectedHotels[0]?.reviews;
        break;
      case 'Aileler':
        selectedCategoryReviews = this.selectedHotels[0]?.familyReviews;
        break;
      case 'Çiftler':
        selectedCategoryReviews = this.selectedHotels[0]?.couplesReviews;
        break;
      case 'Tek Misafirler':
        selectedCategoryReviews = this.selectedHotels[0]?.oneGuestReviews;
        break;
      case 'Arkadaşlar':
        selectedCategoryReviews = this.selectedHotels[0]?.friendsRevies;
        break;
      default:
        selectedCategoryReviews = this.selectedHotels[0]?.allReview;
        break;
    }

    if (selectedCategoryReviews && selectedCategoryReviews.length > 0) {
      return this.calculateAverageRating(selectedCategoryReviews);
    } else {
      return 0;
    }
  }
  getEvaluationText(averageRating: number): string {
    if (averageRating >= 9) {
      return 'Mükemmel';
    } else if (averageRating >= 8) {
      return 'Çok İyi';
    } else if (averageRating >= 7) {
      return 'İyi';
    } else {
      return 'Fena Değil';
    }
  }

  toggleVisibility(rateGuest: any) {
    rateGuest.isVisible = !rateGuest.isVisible;
  }

  modalVisibility() {
    this.isShow = !this.isShow;
  }

  openUserReviewMobileModal(selectedHotels: any, hotel: any, hotelReviews: any) {
    this.isShow=false;
    const modalRef = this.modalService.open(MobileUserReviewsComponent);
    modalRef.componentInstance.selectedHotels = selectedHotels;
    modalRef.componentInstance.hotel = hotel;
    modalRef.componentInstance.hotelReviews = hotelReviews;
  }

}
