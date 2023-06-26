import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChildren
} from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import {PageableObject, PageReportDTO, Report, ReportControllerService, ReportDTO} from "../../../services/api-service";
import {NgbNavChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit/*,OnChanges*/{
  reportsPending?: PageReportDTO;
  pageNumberPending: any
  pageSizePending: any
  totalNumberPending:any

  reportsClosed?: PageReportDTO;
  pageNumberClosed:any
  pageSizeClosed:any
  totalNumberClosed:any
  active:any;
  disabled = true;


  constructor(private reportService: ReportControllerService) {
  }

  ngOnInit(): void {
    this.pageNumberPending=1
    this.pageSizePending=5
    this.refreshReportsPending();

    this.pageNumberClosed=1
    this.pageSizeClosed=5
    this.refreshReportsClosed();
    }

  refreshReportsPending() {

    this.reportService.getReportsByStatus(Report.StatusEnum.PENDING,this.pageNumberPending-1,this.pageSizePending).subscribe({
      next: (page: PageReportDTO )=>{
        this.reportsPending = page;
        this.totalNumberPending = page.totalElements
      },
      error:(error: any)=>{
        console.error(error);
      }
    })
  }

  refreshReportsClosed() {
    console.log("entro")

    this.reportService.getReportsByStatus(Report.StatusEnum.CLOSED,this.pageNumberClosed-1,this.pageSizeClosed).subscribe({
      next: (page: PageReportDTO )=>{
        this.reportsClosed = page;
        this.totalNumberClosed = page.totalElements
        console.log(this.reportsClosed)
      },
      error:(error: any)=>{
        console.error(error);
      }
    })
  }

  closeReport(report:ReportDTO) {
    if(report!=null && report.status=="PENDING"){
      this.reportService.closeReport(report.id!).subscribe({
        next:(value: any)=>{
          report.status = "CLOSED"
          this.reportsClosed?.content?.push(report)
          this.refreshReportsPending();
        }
      })
    }
  }
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }
}
