import { Component, Input } from '@angular/core';
import { ReviewDTO } from 'src/app/services/api-service';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input() review!: ReviewDTO;
}
