import { Component, Input } from '@angular/core';
import { CustomMoneyDTO } from 'src/app/services/api-service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent {

  filledIcon: boolean = false;

  notFavButtonText: string = "Aggiungi ai preferiti";
  isFavButtonText: string = "Rimuovi dai preferiti";
  favButtonText: string = this.notFavButtonText;

  @Input() productPrice?: CustomMoneyDTO;
  priceWithProtection?: string;

  clickFavButton() {
    this.filledIcon=!this.filledIcon;
    this.favButtonText = this.filledIcon ? this.isFavButtonText : this.notFavButtonText;
  }

  constructor() {
    setTimeout(() => {
      var num = this.productPrice?.price?.toString();
      console.log(num);
      this.priceWithProtection = num?.substring(0, num?.length-1) + '2.20';
    }, 200);
  }
}
