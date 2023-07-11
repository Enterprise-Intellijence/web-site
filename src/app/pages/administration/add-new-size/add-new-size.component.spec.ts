import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSizeComponent } from './add-new-size.component';

describe('AddNewSizeComponent', () => {
  let component: AddNewSizeComponent;
  let fixture: ComponentFixture<AddNewSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
