import { Component } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent {
  profileName?: string = 'Your current profile name';
  iban?: string = "ITXXXXXXXXXXXXXXXXXXXXXXXXX";
  arrowRight = faAngleRight;
}
