import { Component, Input } from '@angular/core';
import { ProductDTO, ProductBasicDTO, CustomMoneyDTO } from 'src/app/services/api-service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent {

  productBasicDTO: ProductBasicDTO | undefined;

  isFav: boolean = false;

  notFavButtonText: string = "Aggiungi ai preferiti";
  isFavButtonText: string = "Rimuovi dai preferiti";

  @Input() productDTO?: ProductDTO;
  priceWithProtection?: string;
  fullHeartIcon= faHeartFull;
  emptyHeartIcon= faHeart;

  clickFavButton() {
    this.userLikesService.toggleLikeProduct(this.productBasicDTO!);
    alert("liked");
  }

  clickBuyButton() {
    alert("Acquisto effettuato");
  }

  clickOfferButton() {
    alert("Offerta effettuata");
  }

  clickInfoButton() {
    alert("Informazioni prodotto");
  }

  ngOnChanges() {
    this.productBasicDTO = { ...this.productDTO!, productImages: undefined };
    this.isFav = this.userLikesService.isProductLiked(this.productBasicDTO!);
    console.log("ngChange" + this.isFav)

  }

  constructor(private userLikesService: UserLikesService) {
    userLikesService.LikedProducts$.subscribe((products) => {
      this.isFav = userLikesService.isProductLiked(this.productBasicDTO!);
      console.log(this.isFav)
    });
  }
}
