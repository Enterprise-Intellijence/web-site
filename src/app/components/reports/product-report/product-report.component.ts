import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductBasicDTO, ReportControllerService } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent {

  @Input() product?: ProductBasicDTO;
  reportMessage: string = '';
  maxReportMessageLength: number = 200;
  @Output() isProductReported = new EventEmitter<boolean>();

  constructor(
    private currentUserService: CurrentUserService,
    private reportService: ReportControllerService
  ) { }

  reportConversation() {
    this.reportService.createReport({
      reporterUser: this.currentUserService.user!,
      reportedUser: this.product!.seller!,
      reportedProduct: this.product!,
      description: this.reportMessage
    }).subscribe( () => {
      this.isProductReported.emit(true);
    });
  }
}
