import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'purchasing-page',
  templateUrl: './purchasing-page.component.html',
  styleUrls: ['./purchasing-page.component.scss']
})
export class PurchasingPageComponent {

  constructor(private router: Router) {}

  // TODO: Get product pic from product service
  productPic: string = "";
  productName?: string = "Product name here";
  productDescription?: string = "Product description here";
  productPrice?: Number = 15;

  faPlusIcon = faPlus;



  profileName?: string = "Owner of the card's name";
  cardNumber?: string = "example: 1234 1234 1234 1234";
  expirationDay?: string = "MM/AA";
  secureCode?: string = "example: 123";
  error: boolean = false;




  ngOnInit(){}




  formatDateInput(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (cleanedValue.length > 2) {
      const month = cleanedValue.substring(0, 2);
      const year = cleanedValue.substring(2, 4);
      formattedValue = `${month}/${year}`;

      const monthNumber = parseInt(month, 10);
      if (monthNumber < 1 || monthNumber > 12) {
        this.error = true;
      } else {
        this.error = false;
      }
    } else {
      formattedValue = cleanedValue;
      this.error = false;
    }

    input.value = formattedValue;
  }




  //TODO: fare in modo che se il toggle switch sia selezionato, non è possibile scegliere una posizione dalla mappa

}
