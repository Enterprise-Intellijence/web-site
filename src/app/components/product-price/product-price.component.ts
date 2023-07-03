import { Component, Input, OnChanges } from '@angular/core';
import { ProductDTO, ProductBasicDTO, CustomMoneyDTO, UserBasicDTO, UserDTO, OfferControllerService, OfferCreateDTO } from 'src/app/services/api-service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faCircleInfo, faCommentDollar, faEdit, faHeart as faHeartFull, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { UserLikesService } from 'src/app/services/user-likes.service';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges {

  fullHeartIcon = faHeartFull;
  emptyHeartIcon = faHeart;
  faCartShopping = faCartShopping;
  faShareNodes = faShareNodes;
  faCircleInfo = faCircleInfo;
  faCommentDollar = faCommentDollar;
  faEdit = faEdit;



  @Input() productDTO?: ProductDTO;

  get isPrivate() {
    return this.productDTO?.visibility == ProductDTO.VisibilityEnum.PRIVATE;
  }


  currentUser: UserDTO | null = null;
  get isSeller(): boolean {
    return this.currentUser?.id === this.productDTO?.seller?.id;
  }

  isLiked: boolean = false;


  isMakingOffer: boolean = false;
  offerAmount: number = this.productDTO?.productCost?.price || 0;
  offerCurrency: CustomMoneyDTO.CurrencyEnum = this.productDTO?.productCost?.currency || "EUR";

  wasLinkCopied: boolean = false;


  constructor(
    private currentUserService: CurrentUserService,
    private offerService: OfferControllerService,
    private userLikesService: UserLikesService,
    private productService: ProductService,
    private router: Router) {
    this.userLikesService.LikedProducts$.subscribe((products) => {
      this.isLiked = userLikesService.isProductLikedById(this.productDTO?.id!);
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
    if (this.isSeller && this.isPrivate) {
      this.productService.getProductCapabilityURL(this.productDTO?.id!).subscribe((url) => {
        this.copyToClipboard(url);
      });
    }
    else {
      var url = window.location.href;
      this.copyToClipboard(url);
    }
  }



  private copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.wasLinkCopied = true;
      setTimeout(() => {
        this.wasLinkCopied = false;
      }, 3000);
    });
  }

  clickEdit() {
    alert("coming soon!");
    throw new Error('Method not implemented.');
  }

  ngOnChanges() {
    this.isLiked = this.userLikesService.isProductLikedById(this.productDTO?.id!);
    this.offerAmount = this.productDTO?.productCost?.price || 0;
    this.offerCurrency = this.productDTO?.productCost?.currency || "EUR";
  }



}
