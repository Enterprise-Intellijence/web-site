import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../models/config';

@Pipe({
  name: 'defaultProductPic'
})
export class DefaultProductPicPipe implements PipeTransform {

  transform(url?: string): String {
    if (url) {
      return url;
    } else {
      return "/assets/images/default-product-pic.png";
    }
  }

}

