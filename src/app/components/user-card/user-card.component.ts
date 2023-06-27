import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageControllerService, UserBasicDTO } from 'src/app/services/api-service';

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
  @Input() seller?: UserBasicDTO

  sellerPic: any

  constructor(imageService: ImageControllerService, config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
    
	}
}

