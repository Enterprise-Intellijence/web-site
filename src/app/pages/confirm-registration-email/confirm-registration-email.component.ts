import { Component } from '@angular/core';
import { ProductBasicDTO, ReviewControllerService, ReviewDTO, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'confirm-registration-email',
  templateUrl: './confirm-registration-email.component.html'
})
export class ConfirmRegistrationEmailComponent {

  user: UserDTO | null = null;
  reviewPageMap: Map<number, Array<ReviewDTO>> = new Map<number, Array<ReviewDTO>>();
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private currentUserService: CurrentUserService,
              private reviewService: ReviewControllerService) { }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
      this.loadReviews();
    })
  }

  loadReviews() {

    let userId = this.user?.id;

    this.reviewService.allReviewReceived(this.pageNumber - 1, this.pageSize).subscribe(page => {
      this.reviewPageMap.set(this.pageNumber, page.content!);
      this.totalPages = page.totalPages!;
      this.totalElements = page.totalElements!;
      console.log(page);

    });
  }

  changePage() {
    this.loadReviews();
  }

}
