import { Component } from '@angular/core';
import { ProductBasicDTO } from 'src/app/services/api-service';
import { UserLikesService } from 'src/app/services/user-likes.service';

@Component({
  selector: 'liked-products-page',
  templateUrl: './liked-products-page.component.html',
  styleUrls: ['./liked-products-page.component.scss']
})
export class LikedProductsPageComponent {

  productList!: Set<ProductBasicDTO>;
  
  ngOnInit(): void {
    this.productList = this.userLikesService.LikedProductsSet;
  }

  constructor(private userLikesService: UserLikesService) {
  }
}
