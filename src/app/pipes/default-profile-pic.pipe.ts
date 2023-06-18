import { Pipe, PipeTransform } from '@angular/core';
import { UserImageDTO } from '../services/api-service';
import { SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'defaultProfilePic'
})
export class DefaultProfilePicPipe implements PipeTransform {

  transform(s: String | undefined): String {
    if (s) {
      return s.toString();
    } else {
      return "/assets/images/default-profile-pic.png";
    }
  }
}
