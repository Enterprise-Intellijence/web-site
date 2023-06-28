import { Pipe, PipeTransform } from '@angular/core';
import { UserImageDTO } from '../services/api-service';
import { SafeUrl } from '@angular/platform-browser';
import { Config } from '../models/config';

@Pipe({
  name: 'defaultProfilePic'
})
export class DefaultProfilePicPipe implements PipeTransform {

  transform(url: String | undefined): String {
    if (url) {
        return url;
    } else {
      return Config.basePath + "/assets/images/default-profile-pic.png";
    }
  }
}
