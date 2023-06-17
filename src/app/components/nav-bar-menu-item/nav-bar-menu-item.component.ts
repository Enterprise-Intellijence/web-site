import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';

@Component({
  selector: 'nav-bar-menu-item',
  templateUrl: './nav-bar-menu-item.component.html',
  styleUrls: ['./nav-bar-menu-item.component.scss']
})
export class NavBarMenuItemComponent implements OnInit {
  @Input() title: string = 'undefined';
  @Input() primaryCategory?: ProductCategory;

  // small unique id for the menu item
  uniqueId = Math.random().toString(36).substring(2, 15);

  selectedSecondaryCategory: ProductCategory | undefined;


  ngOnInit(): void {
    if (!this.primaryCategory) {
      throw new Error('primaryCategory is undefined');
    }

    this.selectedSecondaryCategory = this.primaryCategory.childCategories.at(0);
  }


}
