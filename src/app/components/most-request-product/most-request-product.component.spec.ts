import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRequestProductComponent } from './most-request-product.component';

describe('MostRequestProductComponent', () => {
  let component: MostRequestProductComponent;
  let fixture: ComponentFixture<MostRequestProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostRequestProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostRequestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
