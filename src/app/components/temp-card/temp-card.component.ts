import { Component, Input } from '@angular/core';
import { ProductDTO } from "../../services/api-service";

@Component({
  selector: 'temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.scss']
})
export class TempCardComponent {

  @Input() product!: ProductDTO;

  constructor() {
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
    }
  }

}
