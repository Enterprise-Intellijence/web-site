import { Component, Input, OnChanges } from '@angular/core';
import { ProductDTO, ProductBasicDTO, CustomMoneyDTO, UserBasicDTO, UserDTO } from 'src/app/services/api-service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faCircleInfo, faCommentDollar, faEdit, faHeart as faHeartFull, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges {

  isFav: boolean = false;

  notFavButtonText: string = "Add to favourites";
  isFavButtonText: string = "Remove from favourites";

  @Input() productDTO?: ProductDTO;
  priceWithProtection?: string;
  currentUser: UserDTO | null = null;
  fullHeartIcon= faHeartFull;
  emptyHeartIcon= faHeart;
  faCartShopping= faCartShopping;
  faShareNodes= faShareNodes;
  faCircleInfo= faCircleInfo;
  faCommentDollar= faCommentDollar;
  faEdit= faEdit;


  clickFavButton() {
    this.userLikesService.toggleLikeProductById(this.productDTO?.id!).subscribe();
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

  clickShareProduct() {

  }

  clickEdit() {

  }

  ngOnChanges() {
    this.isFav = this.userLikesService.isProductLikedById(this.productDTO?.id!);
  }

  constructor(private currentUserService: CurrentUserService ,private userLikesService: UserLikesService, private router: Router) {
    userLikesService.LikedProducts$.subscribe((products) => {
      this.isFav = userLikesService.isProductLikedById(this.productDTO?.id!);
      console.log(this.isFav)
    });

    currentUserService.user$.subscribe( (user) => {
      this.currentUser = user;
    })
  }
  
}
