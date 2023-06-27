import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { Config } from 'src/app/models/config';
import { ImageControllerService, UserBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [NgbRatingModule],
  providers: [NgbRatingConfig]
})
export class UserCardComponent implements OnInit {
  
  @Input() rating?: number
  @Input() seller?: UserBasicDTO

  sellerPic: any

  ngOnInit(): void {
    this.sellerPic = Config.basePath + this.seller?.photoProfile?.urlPhoto
    console.log(this.sellerPic)
  }


  constructor(imageService: ImageControllerService, config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;

	}
}

