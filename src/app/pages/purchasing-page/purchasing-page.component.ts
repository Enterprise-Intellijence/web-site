import { Component } from '@angular/core';

@Component({
  selector: 'purchasing-page',
  templateUrl: './purchasing-page.component.html',
  styleUrls: ['./purchasing-page.component.scss']
})
export class PurchasingPageComponent {

  constructor() {}

  // TODO: Get product pic from product service
  productPic: String = "";
  productName?: String = "Product name here";
  productDescription?: String = "Product description here";
  productPrice?: Number = 15;

}
