import { Component, Input, OnChanges } from '@angular/core';
import { ProductDTO, ProductBasicDTO, CustomMoneyDTO } from 'src/app/services/api-service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges {

  isFav: boolean = false;

  productBasicDTO: ProductBasicDTO | undefined

  notFavButtonText: string = "Aggiungi ai preferiti";
  isFavButtonText: string = "Rimuovi dai preferiti";

  @Input() productDTO?: ProductDTO;
  priceWithProtection?: string;
  fullHeartIcon= faHeartFull;
  emptyHeartIcon= faHeart;

  clickFavButton() {
    this.userLikesService.toggleLikeProduct(this.productBasicDTO!).subscribe();
    alert("liked");
  }

  clickBuyButton() {
    this.router.navigate(["/checkout", this.productDTO?.id]);
    alert("Acquisto effettuato");
  }

  clickOfferButton() {
    alert("Offerta effettuata");
  }

  clickInfoButton() {
    alert("Informazioni prodotto");
  }

  ngOnChanges() {
    this.isFav = this.userLikesService.isProductLikedById(this.productDTO?.id!);
  }

  constructor(private userLikesService: UserLikesService, private router: Router) {
    userLikesService.LikedProducts$.subscribe((products) => {
      this.isFav = userLikesService.isProductLiked(this.productBasicDTO!);
      console.log(this.isFav)
    });
  }
}
