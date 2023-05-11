import { Component, Input } from '@angular/core';
import { ProductDTO } from 'src/app/services/api-service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  @Input() productInfo?: ProductDTO;
}
