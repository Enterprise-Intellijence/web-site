import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyClosetComponent } from './empty-closet.component';

describe('EmptyClosetComponent', () => {
  let component: EmptyClosetComponent;
  let fixture: ComponentFixture<EmptyClosetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyClosetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyClosetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
