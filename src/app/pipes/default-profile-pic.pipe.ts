import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultProfilePic'
})
export class DefaultProfilePicPipe implements PipeTransform {

  transform(s: String): String {
    if (s) {
      return s;
    } else {
      return "/assets/images/default-profile-pic.png";
    }
  }
}
