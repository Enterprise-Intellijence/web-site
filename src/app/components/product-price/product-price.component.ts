import { Component, Input, OnChanges } from '@angular/core';
import { ProductDTO, ProductBasicDTO, CustomMoneyDTO, UserBasicDTO, UserDTO, OfferControllerService, OfferCreateDTO } from 'src/app/services/api-service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faCircleInfo, faCommentDollar, faEdit, faHeart as faHeartFull, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { NgForm } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges {


  isFav: boolean = false;

  notFavButtonText: string = "Add to favourites";
  isFavButtonText: string = "Remove from favourites";

  get isSeller(): boolean {
    return this.currentUser?.id === this.productDTO?.seller?.id;
  }

  @Input() productDTO?: ProductDTO;
  priceWithProtection?: string;

  currentUser: UserDTO | null = null;


  fullHeartIcon = faHeartFull;
  emptyHeartIcon = faHeart;
  faCartShopping = faCartShopping;
  faShareNodes = faShareNodes;
  faCircleInfo = faCircleInfo;
  faCommentDollar = faCommentDollar;
  faEdit = faEdit;


  isMakingOffer: boolean = false;
  offerAmount: number = this.productDTO?.productCost?.price || 0;
  offerCurrency: CustomMoneyDTO.CurrencyEnum = this.productDTO?.productCost?.currency || "EUR";


  constructor(
    private currentUserService: CurrentUserService,
    private offerService: OfferControllerService,
    private userLikesService: UserLikesService,
     private router: Router) {
    this.userLikesService.LikedProducts$.subscribe((products) => {
      this.isFav = userLikesService.isProductLikedById(this.productDTO?.id!);
    });

    this.currentUserService.user$.subscribe((user) => {
      this.currentUser = user;
    })
  }

  offerChanged($event: number) {
    this.offerAmount = $event;
    if (this.offerAmount < 0) {
      this.offerAmount = 0;
    }
    console.log("offer changed: ", this.offerAmount);
  }


  clickFavButton() {
    this.userLikesService.toggleLikeProductById(this.productDTO?.id!).subscribe();
    alert("liked");
  }

  clickBuyButton() {
    this.router.navigate(["/checkout", this.productDTO?.id]);
    alert("Acquisto effettuato");
  }

  clickOfferButton() {
    this.isMakingOffer = !this.isMakingOffer;
  }

  submitOffer(form: NgForm) {
    if (form.valid) {
      console.log("form valid");

      var offer: OfferCreateDTO = {
        amount: {
          price: this.offerAmount,
          currency: this.offerCurrency
        },
        product: this.productDTO,
      }

      this.offerService.createOffer(offer, "body").subscribe((offer) => {
        console.log("offer created: ", offer);
        this.router.navigate(["/messages"]);
        this.isMakingOffer = false;
      })

    }
  }


  clickInfoButton() {
    this.router.navigate(["/messages/new/", this.productDTO?.seller?.id], {
      queryParams: {
        "product-id": this.productDTO?.id
      }
    });
  }

  clickShareProduct() {
    alert("coming soon!");
    throw new Error('Method not implemented.');
  }

  clickEdit() {
    alert("coming soon!");
    throw new Error('Method not implemented.');
  }

  ngOnChanges() {
    this.isFav = this.userLikesService.isProductLikedById(this.productDTO?.id!);
    this.offerAmount = this.productDTO?.productCost?.price || 0;
    this.offerCurrency = this.productDTO?.productCost?.currency || "EUR";
  }



}
