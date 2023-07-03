import { Pipe, PipeTransform } from '@angular/core';
import { UserImageDTO } from '../services/api-service';
import { SafeUrl } from '@angular/platform-browser';
import { Config } from '../models/config';

@Pipe({
  name: 'defaultProfilePic'
})
export class DefaultProfilePicPipe implements PipeTransform {

  defaultImage: string = "/assets/images/default-profile-pic.png"

  transform(value: UserImageDTO | string | undefined): string {
    if (!value)
      return this.defaultImage;

    if (typeof value === 'string') {
      return value;
    }
    return value.urlPhoto!;
  }
}
