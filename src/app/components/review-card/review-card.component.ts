import { Component, Input } from '@angular/core';
import { ReviewDTO } from 'src/app/services/api-service';
import { IconDefinition, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  faStar = faStar;
  faStarEmpty = faStarEmpty;
  @Input() review!: ReviewDTO;
}
