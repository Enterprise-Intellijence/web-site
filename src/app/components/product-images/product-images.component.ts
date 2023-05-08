import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent {

  @Input() thumbnails: String[] = ["https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
                          "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp",
                          "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"];

  image: String = this.thumbnails[0];

  changeImage(index: number) {
    this.image = this.thumbnails[index];
  }

}
