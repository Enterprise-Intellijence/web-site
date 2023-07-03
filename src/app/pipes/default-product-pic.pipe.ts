import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../models/config';
import { ProductImageDTO } from '../services/api-service';

@Pipe({
  name: 'defaultProductPic'
})
export class DefaultProductPicPipe implements PipeTransform {

  defaultImage: string = "/assets/images/default-product-pic.png"

  transform(value: ProductImageDTO[] | ProductImageDTO | string | undefined): string {
    if (!value)
      return this.defaultImage;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        return value[0].urlPhoto!;
      }
      return this.defaultImage;

    } else {
      // not an array

      if (typeof value === 'string') {
        return value;
      }
      return value.urlPhoto!;
    }
  }
}

