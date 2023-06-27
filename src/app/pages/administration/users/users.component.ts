import {Component, OnInit} from '@angular/core';
import {AdminControllerService, PageUserDTO, UserControllerService} from "../../../services/api-service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  admins!: PageUserDTO

  users!:PageUserDTO

  constructor(private adminService:AdminControllerService) {
  }

  ngOnInit(): void {
    this.adminService.getUsers(0,10).subscribe({
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
}
