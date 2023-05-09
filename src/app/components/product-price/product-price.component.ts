import { Component } from '@angular/core';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent {

  filledIcon = false;

  notFavButtonText = "Aggiungi ai preferiti";
  isFavButtonText = "Rimuovi dai preferiti";
  favButtonText = this.notFavButtonText;

  clickFavButton() {
    this.filledIcon=!this.filledIcon;
    this.favButtonText = this.filledIcon ? this.isFavButtonText : this.notFavButtonText;
  }
}
