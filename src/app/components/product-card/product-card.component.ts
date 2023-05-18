import { Component, Input, OnInit } from '@angular/core';
import { ProductControllerService, ProductDTO } from "../../services/api-service";
import { ProductService } from 'src/app/services/product.service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  fullHeartIcon = faHeartFull;
  emptyHeartIcon = faHeart;

  @Input() product!: ProductDTO;

  userLikesProduct: boolean = false;

  totalLikes: number = 0;

  constructor(private productService: ProductControllerService) {
    this.createFakeProduct();
  }

  ngOnInit(): void {
    this.productService.allProduct().subscribe((products) => {
      console.log(products);
    });

    // TODO: get the total number of likes from the server
    this.totalLikes = this.product.usersThatLiked?.length || 0;



    // TODO: check if the user has already liked the product

  }


  public toggleLike() {
    // TODO: send a request to the server to like/unlike the product
    this.userLikesProduct = !this.userLikesProduct;
    this.totalLikes += this.userLikesProduct ? 1 : -1;
    console.log("User likes product: " + this.userLikesProduct);

  }




  private createFakeProduct() {
    this.product = {
      id: "0",
      title: "A test product",
      description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
      Duis vulputate commodo lectus, ac blandit elit tincidunt id.`,
      myMoney: {
        price: 14.99,
        currency: "EUR"
      },
      brand: "Nike",
      condition: "NEW_WITH_TAG",
      address: {
        city: "Milan",
        country: "Italy",
        street: "Via Roma",
        postalCode: "20100"
      },
      productSize: "MEDIUM",
      views: 0,
      uploadDate: new Date(),
      visibility: "PUBLIC",
      availability: "AVAILABLE",
      productCategory: "CLOTHING",
      seller: {
        id: "0",
        username: "Mario Rossi",
        email: "mario.rossi@gmail.com",
        role: "USER",
        address: {
          city: "Milan",
          country: "Italy",
          street: "Via Roma",
          postalCode: "20100"
        },
        provider: "LOCAL"
      },
      usersThatLiked: [],
      messages: [],
    };
  }
}
