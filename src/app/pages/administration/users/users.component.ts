import {Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  AdminControllerService,
  PageUserDTO,
  SuperAdminControllerService,
  UserControllerService,
  UserDTO
} from "../../../services/api-service";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {CurrentUserService} from "../../../services/current-user.service";
import RoleEnum = UserDTO.RoleEnum;
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  styles: [
    `
			.form-control {
				width: 300px;
			}
		`,
  ],
})
export class UsersComponent implements OnInit{
  admins?: PageUserDTO
  pageAdmin: number = 1
  sizeAdmin: number = 5
  totalAdmins: number = 0

  users?:PageUserDTO
  pageUsers: number = 1
  sizeUsers: number = 10
  totalUsers: number = 0

  messagesIcon = faEnvelope;
  inputControl = new FormControl();

  constructor(private adminService:AdminControllerService, public currentUser: CurrentUserService, private  superAdminService: SuperAdminControllerService) {

  }

  ngOnInit(): void {
    this.refreshAdmins()
    this.refreshUsers()


  }


  sendMessageTo() {
    //todo

  }

  refreshAdmins() {
    this.adminService.getUsers(this.pageAdmin-1,this.sizeAdmin,RoleEnum.ADMIN,'').subscribe({
      next:(page: PageUserDTO)=>{
        this.admins = page
        this.totalAdmins = page.totalElements || 0
      },
      error:(error: any)=>{
        console.error(error)
      }
    })
  }



  refreshUsers() {
    this.adminService.getUsers(this.pageUsers-1,this.sizeUsers,RoleEnum.USER).subscribe({
      next:(page: PageUserDTO)=>{
        this.users = page
        this.totalUsers = page.totalElements || 0
      },
      error:(error: any)=>{
        console.error(error)
      }
    })
  }

  promoteDemoteUser(user: UserDTO) {
    this.superAdminService.changeRole(user!.id!,(user.role==='USER') ? (RoleEnum.ADMIN) : RoleEnum.USER).subscribe({
      next:(value:any)=>{
        this.refreshAdmins()
        this.refreshUsers()
      }
    })

  }


  handleInput(value: string) {
    this.adminService.getUsers(this.pageUsers-1,this.sizeUsers,RoleEnum.USER,value).subscribe({
      next:(page: PageUserDTO)=>{
        this.users = page
        this.totalUsers = page.totalElements || 0
      },
      error:(error: any)=>{
        console.error(error)
      }
    })
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.length % 2 === 0) {
      this.handleInput(value);
    }
  }

  @HostListener('keydown.enter', ['$event.target.value'])
  onEnter(value: string) {
    this.handleInput(value);
  }
}
