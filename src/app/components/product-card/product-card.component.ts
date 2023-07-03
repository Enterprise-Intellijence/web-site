import { Component, Input, OnInit } from '@angular/core';
import { ProductBasicDTO, ProductControllerService, ProductDTO, UserImageDTO } from "../../services/api-service";
import { ProductService } from 'src/app/services/product.service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';
import { DefaultProductPicPipe } from 'src/app/pipes/default-product-pic.pipe';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  fullHeartIcon = faHeartFull;
  emptyHeartIcon = faHeart;

  @Input() product!: ProductBasicDTO;


  userLikesProduct: boolean = false;

  totalLikes: number = 0;

  constructor(private userLikesService: UserLikesService) {

  }

  ngOnInit(): void {
    this.userLikesService.LikedProducts$.subscribe(() => {
      this.userLikesProduct = this.userLikesService.isProductLiked(this.product);
    });

    this.totalLikes = this.product.likesNumber || 0;
    this.userLikesProduct = this.userLikesService.isProductLiked(this.product);
  }


  public toggleLike() {
    this.userLikesService.toggleLikeProduct(this.product).subscribe(() => {
      this.userLikesProduct = !this.userLikesProduct;
      this.totalLikes += this.userLikesProduct ? 1 : -1;
    });
  }
}
