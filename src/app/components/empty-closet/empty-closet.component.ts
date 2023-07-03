import { Component, Input } from '@angular/core';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { UserDTO } from 'src/app/services/api-service';

@Component({
  selector: 'empty-closet',
  templateUrl: './empty-closet.component.html',
  styleUrls: ['./empty-closet.component.scss']
})
export class EmptyClosetComponent {

  @Input() show: boolean = false;
  @Input() isCurrentUser: boolean = false;
  faCubes = faCubes;
  faSquarePlus = faSquarePlus;

  constructor() { }
    
}
