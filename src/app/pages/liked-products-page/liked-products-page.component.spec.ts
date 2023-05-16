import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedProductsPageComponent } from './liked-products-page.component';

describe('LikedProductsPageComponent', () => {
  let component: LikedProductsPageComponent;
  let fixture: ComponentFixture<LikedProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedProductsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
