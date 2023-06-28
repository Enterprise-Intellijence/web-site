import {Component, OnInit} from '@angular/core';
import {AdminControllerService, PageUserDTO, UserControllerService, UserDTO} from "../../../services/api-service";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {CurrentUserService} from "../../../services/current-user.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  admins!: PageUserDTO

  users!:PageUserDTO

  messagesIcon = faEnvelope;

  loggedUser: UserDTO | null | undefined;






  constructor(private adminService:AdminControllerService, private currentUser: CurrentUserService) {
    if(this.currentUser!=null){
      this.loggedUser = this.currentUser?.user;
    }
  }

  ngOnInit(): void {
    this.adminService.getUsers(0,5).subscribe({
      next:(page:PageUserDTO)=>{
        this.admins = page
      },
      error:(error: any)=>{
        console.error(error)
      }
    })

  }

  refreshAdmins() {

  }

  sendMessageTo() {

  }


}
