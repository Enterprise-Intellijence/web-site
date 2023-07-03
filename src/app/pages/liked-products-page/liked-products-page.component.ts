import { Component } from '@angular/core';
import { filter, toArray } from 'rxjs';
import { FilterOptions } from 'src/app/models/filter-options';
import { ProductBasicDTO } from 'src/app/services/api-service';
import { UserLikesService } from 'src/app/services/user-likes.service';

@Component({
  selector: 'liked-products-page',
  templateUrl: './liked-products-page.component.html',
  styleUrls: ['./liked-products-page.component.scss']
})
export class LikedProductsPageComponent {

  likedProducts: ProductBasicDTO[] = [];
  numberElements: any;
  page: number = 1;
  pageSize: any = 12;


  ngOnInit(): void {
    this.userLikesService.LikedProducts$.subscribe((products) => {
      this.likedProducts = Array.from(products)
      this.numberElements = this.likedProducts.length

    });
  }

  constructor(private userLikesService: UserLikesService) {
  }
}
