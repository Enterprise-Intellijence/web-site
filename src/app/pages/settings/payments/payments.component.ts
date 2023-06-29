import { Component } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PaymentMethodControllerService } from 'src/app/services/api-service';
import { PaymentMethodCreateDTO } from 'src/app/services/api-service/model/paymentMethodCreateDTO';

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  arrowRight = faAngleRight
  cardOwnerPlaceholder: string = "Owner of the card's name";
  cardOwnerName: string = "";

  cardNumberPlaceholder: string = "example: 1234 1234 1234 1234";
  cardNumber: string = "";

  expirationDayPlaceholder: string = "MM/AA";
  expirationDay: string = "";

  secureCodePlaceholder: string = "example: 123";
  secureCode: string = "";

  error: boolean = false;
  alertErrorMessage!: string;

  constructor(private paymentsService: PaymentMethodControllerService) {

  }

  ngOnInit() { }

  formatDateInput(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    let isError = false;

    if (cleanedValue.length <= 2) {
      formattedValue = `${cleanedValue.substring(0, 2)}`;
    } else {
      formattedValue = cleanedValue;
    }

    if (cleanedValue.length > 2) {
      formattedValue = `${cleanedValue.substring(0, 2)}`
        + `/${cleanedValue.substring(2, 4)}`;
    }

    const month = parseInt(formattedValue.substring(0, 2));

    // month should be between 1 and 12
    if (month > 12) {
      this.error = true;
      isError = true;
      this.alertErrorMessage = "Please, enter a valid month";
    }

    if (!isError)
      this.error = false;

    input.value = formattedValue;
    this.expirationDay = "20" + formattedValue.substring(3, 5) + "-" + formattedValue.substring(0, 2) + "-30";
  }

  formatCardNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    let formattedValue = '';


    if (cleanedValue.length <= 4) {
      formattedValue = `${cleanedValue.substring(0, 4)}`;
    } else {
      formattedValue = cleanedValue;
    }

    if (cleanedValue.length > 4 && cleanedValue.length <= 8) {
      formattedValue = `${cleanedValue.substring(0, 4)}`
        + ` ${cleanedValue.substring(4, 8)}`;
    }

    if (cleanedValue.length > 8 && cleanedValue.length <= 12) {
      formattedValue = `${cleanedValue.substring(0, 4)}`
        + ` ${cleanedValue.substring(4, 8)}`
        + ` ${cleanedValue.substring(8, 12)}`;
    }

    if (cleanedValue.length > 12) {
      formattedValue = `${cleanedValue.substring(0, 4)}`
        + ` ${cleanedValue.substring(4, 8)}`
        + ` ${cleanedValue.substring(8, 12)}`
        + ` ${cleanedValue.substring(12, 16)}`;
    }

    input.value = formattedValue;
    this.cardNumber = formattedValue;
  }

  formatSecureCode(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (cleanedValue.length > 4) {
      formattedValue = `${cleanedValue.substring(0, 4)}`;
    } else {
      formattedValue = cleanedValue;
    }

    input.value = formattedValue;
    this.secureCode = formattedValue;
  }

  setCardOwnerName(event: any) {
    const input = event.target as HTMLInputElement;
    this.cardOwnerName = input.value;
  }

  save() {
    if (this.cardOwnerName === "") {
      this.error = true;
      this.alertErrorMessage = "Please, enter a card owner name";
      return;
    }

    if (this.cardNumber === "") {
      this.error = true;
      this.alertErrorMessage = "Please, enter a card number";
      return;
    }

    if (this.expirationDay === "") {
      this.error = true;
      this.alertErrorMessage = "Please, enter a expiration day";
      return;
    }

    if (this.secureCode === "") {
      this.error = true;
      this.alertErrorMessage = "Please, enter a secure code";
      return;
    }

    let p: PaymentMethodCreateDTO = {
      creditCard: this.cardNumber,
      expiryDate: this.expirationDay,
      owner: this.cardOwnerName,
      _default: false
    }

    this.error = false;
    this.paymentsService.createPaymentMethod(p).subscribe((response) => {
      console.log(response);
    });
  }

}
