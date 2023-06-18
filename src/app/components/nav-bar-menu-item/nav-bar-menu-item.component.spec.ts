import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMenuItemComponent } from './nav-bar-menu-item.component';

describe('NavBarMenuItemComponent', () => {
  let component: NavBarMenuItemComponent;
  let fixture: ComponentFixture<NavBarMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
