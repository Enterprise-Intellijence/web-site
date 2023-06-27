import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSingleViewComponent } from './report-single-view.component';

describe('ReportSingleViewComponent', () => {
  let component: ReportSingleViewComponent;
  let fixture: ComponentFixture<ReportSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSingleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
