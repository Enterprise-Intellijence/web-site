import { Component } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  arrowRight = faAngleRight
  profileName?: string = "Owner of the card's name";
  cardNumber?: string = "ad es: 1234 1234 1234 1234";
  expirationDay?: string = "MM/AA";
  secureCode?: string = "ad es: 123";
  error: boolean = false;
  constructor(private router: Router){
    
  }

  ngOnInit(){}

  onBtnClick(){
    // Navigate to /products page
    this.router.navigate(['settings','payments','bank-account']);
  }




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

}
