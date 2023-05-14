import { Component, Input, OnInit } from '@angular/core';
import { ProductControllerService, ProductDTO } from "../../services/api-service";
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: ProductDTO;

  constructor(private productService: ProductControllerService) {
    this.createFakeProduct();
  }

  ngOnInit(): void {
    this.productService.allProduct().subscribe((products) => {
      console.log(products);
    });
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
