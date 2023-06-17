import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'defaultProductPic'
})
export class DefaultProductPicPipe implements PipeTransform {
    
        transform(s: String): String {
            if (s) {
                return s;
            } else {
                return "/assets/images/default-product-pic.png";
            }
        }
    
    }

