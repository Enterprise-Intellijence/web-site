import { Component, Input } from '@angular/core';
import { AddressDTO, ProductDTO } from 'src/app/services/api-service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  addressProduct?: AddressDTO;
  @Input() productInfo?: ProductDTO;

  constructor() {
    this.addressProduct = this.productInfo?.address;
    console.log(this.addressProduct);
  }
}
