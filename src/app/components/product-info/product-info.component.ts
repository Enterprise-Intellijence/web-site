import { Component, Input } from '@angular/core';
import { ProductDTO, AddressDTO, UserControllerService } from 'src/app/services/api-service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  address: AddressDTO | undefined;
  @Input() productInfo?: ProductDTO;

  constructor(private userService: UserControllerService) {
    userService.getDefaultAddress(this.productInfo?.seller?.id!).subscribe((address_) => {
      this.address = address_;
    })
  }
}
