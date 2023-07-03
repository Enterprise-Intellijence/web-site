import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyReviewsComponent } from './empty-reviews.component';

describe('EmptyReviewsComponent', () => {
  let component: EmptyReviewsComponent;
  let fixture: ComponentFixture<EmptyReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
