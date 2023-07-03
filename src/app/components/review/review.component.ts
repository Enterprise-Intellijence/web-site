import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ReviewControllerService, ReviewDTO, UserBasicDTO, UserDTO } from 'src/app/services/api-service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnChanges {

  @Input() visitedUser: UserBasicDTO | null = null;
  @Input() isCurrentUser: boolean = false;
  reviewPageMap: Map<number, Array<ReviewDTO>> = new Map<number, Array<ReviewDTO>>();
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private reviewService: ReviewControllerService) { }

  ngOnChanges(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.allReviewReceived(this.visitedUser?.id!, this.pageNumber - 1, this.pageSize).subscribe(page => {
      this.reviewPageMap.set(this.pageNumber, page.content!);
      this.totalPages = page.totalPages!;
      this.totalElements = page.totalElements!;
    });
  }

  changePage() {
    this.loadReviews();
  }

}
