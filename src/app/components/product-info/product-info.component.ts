import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductDTO, AddressDTO, UserControllerService } from 'src/app/services/api-service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnChanges {

  address: AddressDTO | undefined;
  @Input() productInfo?: ProductDTO;


  ngOnChanges(changes: SimpleChanges) {
    if(this.productInfo){
      this.userService.getDefaultAddress(this.productInfo?.seller?.id!).subscribe((address_) => {
        this.address = address_;
        console.log(this.address)
      })
    }

  }

  constructor(private userService: UserControllerService) { }

}
