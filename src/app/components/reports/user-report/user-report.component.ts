import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent {

  @Input() username?: string;
  reportMessage: string = '';
  maxReportMessageLength: number = 200;
  isUserReported: boolean = false;

  reportConversation() {

  }
}
