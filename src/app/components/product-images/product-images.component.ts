import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges{

  @Input() thumbnails: string[] = [];

  curr_index: number = 0;

  image: string = this.thumbnails[0];


  changeImage(index: number) {
    this.curr_index = index
    this.image = this.thumbnails[index];
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.image = this.thumbnails[0]
  }

}
