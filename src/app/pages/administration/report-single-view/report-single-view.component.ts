import {Component, Input} from '@angular/core';
import {ReportDTO} from "../../../services/api-service";

@Component({
  selector: 'report-single-view',
  templateUrl: './report-single-view.component.html',
  styleUrls: ['./report-single-view.component.scss']
})
export class ReportSingleViewComponent {
  @Input()report?:ReportDTO

}
