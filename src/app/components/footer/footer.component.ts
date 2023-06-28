import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGem, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  faGithub = faGithub;
  faGoogle = faGoogle;
  faTwitter = faTwitter;

  faHome = faHome;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faGem = faGem;

  constructor() { }

}
