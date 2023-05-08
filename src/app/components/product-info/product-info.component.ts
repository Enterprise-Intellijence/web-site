import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/models';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  @Input() productInfo?: Product;
}
