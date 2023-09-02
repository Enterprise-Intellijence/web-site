import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportControllerService, ReportDTO, UserBasicDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent {

  @Input() user?: UserBasicDTO;
  reportMessage: string = '';
  maxReportMessageLength: number = 200;
  @Output() isUserReported = new EventEmitter<boolean>();

  constructor(
    private currentUserService: CurrentUserService,
    private reportService: ReportControllerService
  ) { }

  reportConversation() {
    this.reportService.createReport({
      reporterUser: this.currentUserService.user!,
      reportedUser: this.user!,
      description: this.reportMessage
    }).subscribe( () => {
      this.isUserReported.emit(true);
    });
  }
}
