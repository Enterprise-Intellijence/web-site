import { Injectable } from '@angular/core';
import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {




  constructor(private apiAuth: ApiAuthService) {

  }


}
