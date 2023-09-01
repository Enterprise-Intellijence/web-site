import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent {

  @Input() productName?: string;
  reportMessage: string = '';
  maxReportMessageLength: number = 200;
  isProductReported: boolean = false;

  reportConversation() {}
}
