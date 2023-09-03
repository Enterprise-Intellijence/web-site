import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PageReportDTO, Report, ReportControllerService, ReportDTO } from "../../../services/api-service";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { faInbox, faCircleXmark, faUserShield, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit, OnChanges {
  reportsPending?: PageReportDTO;
  pageNumberPending: any = 1;
  pageSizePending: any = 1;
  totalNumberPending: any = 1;

  reportsClosed?: PageReportDTO;
  pageNumberClosed: any = 1;
  pageSizeClosed: any = 1;
  totalNumberClosed: any = 1;

  myFollowingReports?: PageReportDTO;
  pageNumberFollowing: any = 1;
  pageSizeFollowing: any = 1;
  totalNumberFollowing: any = 1;
  
  singleReportDTO?: ReportDTO;
  
  active: any;
  disabled = true;

  faInbox = faInbox;
  faCircleXmark = faCircleXmark;
  faUserShield = faUserShield;
  faBoxArchive = faBoxArchive


  constructor(private reportService: ReportControllerService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshFollowingReport();
  }

  ngOnInit(): void {
    this.pageNumberPending = 1
    this.pageSizePending = 10
    this.refreshReportsPending();

    this.pageNumberClosed = 1
    this.pageSizeClosed = 10
    this.refreshReportsClosed();
  }

  refreshReportsPending() {
    this.reportService.getReportsByStatus(Report.StatusEnum.PENDING, this.pageNumberPending - 1, this.pageSizePending).subscribe({
      next: (page: PageReportDTO) => {
        this.reportsPending = page;
        this.totalNumberPending = page.totalElements
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  refreshReportsClosed() {
    this.reportService.getReportsByStatus(Report.StatusEnum.CLOSED, this.pageNumberClosed - 1, this.pageSizeClosed).subscribe({
      next: (page: PageReportDTO) => {
        this.reportsClosed = page;
        this.totalNumberClosed = page.totalElements
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  refreshFollowingReport() {
    this.reportService.getReportsMeManaging(0, 10).subscribe({
      next: (page: PageReportDTO) => {
        this.totalNumberFollowing = page.totalElements
        this.myFollowingReports = page;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  closeReport(report: ReportDTO) {
    if (report != null && report.status == "PENDING") {
      this.reportService.closeReport(report.id!).subscribe({
        next: (value: any) => {
          report.status = "CLOSED"
          this.reportsClosed?.content?.push(report)
          this.refreshFollowingReport()
        }
      })
    }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.refreshReportsPending()
    }
    else if (changeEvent.nextId === 2) {
      this.refreshReportsClosed()

    }
    else
      this.refreshFollowingReport()

  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }

  followReport(report: ReportDTO) {
    this.reportService.updateReport(report.id!).subscribe({
      next: (value: ReportDTO) => {
        report = value
        this.refreshReportsPending()
      }
    })
  }

  openReport(report: ReportDTO) {
    this.singleReportDTO = report
  }

  handleClosedReport(value: boolean) {
    this.refreshFollowingReport();
  }
}
