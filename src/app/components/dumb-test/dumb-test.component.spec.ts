import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbTestComponent } from './dumb-test.component';

describe('DumbTestComponent', () => {
  let component: DumbTestComponent;
  let fixture: ComponentFixture<DumbTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
