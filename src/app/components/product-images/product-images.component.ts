import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges{

  @Input() thumbnails: String[] = [];

  image: String = this.thumbnails[0];

  curr_index: any | undefined
  imgSrc: String | undefined

  changeImage(index: number) {
    this.curr_index = index
    this.image = this.thumbnails[index];
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.image = this.thumbnails[0]
  }
  
  openImage(){
    this.imgSrc = this.thumbnails[this.curr_index]
  }

}
