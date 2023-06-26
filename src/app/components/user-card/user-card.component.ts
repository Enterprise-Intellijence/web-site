import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [NgbRatingModule],
  providers: [NgbRatingConfig]
})
export class UserCardComponent {
  
  @Input() rating?: number

  constructor(config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}
}

