import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import {provideRouter} from "@angular/router";

@Component({
  selector: 'nav-bar-menu-item',
  templateUrl: './nav-bar-menu-item.component.html',
  styleUrls: ['./nav-bar-menu-item.component.scss']
})
export class NavBarMenuItemComponent implements OnInit {
  @Input() title: string = 'undefined';
  @Input() primaryCategory?: ProductCategory;

  /**
   * emits when the user selects a category to search for
   *
   * not emitted when the user selects a subcategory
   */
  @Output("onCategorySelected") onCategorySelected = new EventEmitter<ProductCategory>();


  // small unique id for the menu item
  uniqueId = Math.random().toString(36).substring(2, 15);

  selectedSecondaryCategory: ProductCategory | undefined;

  ngOnInit(): void {
    this.selectedSecondaryCategory = this.primaryCategory?.childCategories.at(0);
  }


  ngOnChanges() {
    this.selectedSecondaryCategory = this.primaryCategory?.childCategories.at(0);
  }


  public selectCategory(category?: ProductCategory) {
    if (category) {
      // close the dropdown menu


      this.onCategorySelected.emit(category);
    }
  }



}
