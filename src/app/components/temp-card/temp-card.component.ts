import {Component, Input} from '@angular/core';
import {ProductDTO} from "../../services/api-service";

@Component({
  selector: 'temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.scss']
})
export class TempCardComponent {

  @Input() product!: ProductDTO

}
