import { Component, Input } from '@angular/core';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { UserBasicDTO, UserDTO } from 'src/app/services/api-service';

@Component({
  selector: 'empty-reviews',
  templateUrl: './empty-reviews.component.html',
  styleUrls: ['./empty-reviews.component.scss']
})
export class EmptyReviewsComponent {
  @Input() show: boolean = false;
  @Input() isCurrentUser: boolean = false;
  faPencilSquare = faPencilSquare;

  constructor() { }
}
