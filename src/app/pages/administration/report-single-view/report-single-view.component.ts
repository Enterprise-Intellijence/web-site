import {Component, Input, OnInit} from '@angular/core';
import {
  AdminControllerService,
  ProductBasicDTO,
  ReportControllerService,
  ReportDTO,
  UserBasicDTO,
  UserDTO
} from "../../../services/api-service";
import {CurrentUserService} from "../../../services/current-user.service";
import RoleEnum = UserDTO.RoleEnum;
import StatusEnum = UserDTO.StatusEnum;

@Component({
  selector: 'report-single-view',
  templateUrl: './report-single-view.component.html',
  styleUrls: ['./report-single-view.component.scss']
})
export class ReportSingleViewComponent {
  @Input()report?:ReportDTO

  constructor(private reportService: ReportControllerService,private currentUser: CurrentUserService,private adminService: AdminControllerService) {
  }

  closeReport() {
    if(this.currentUser.user?.role==RoleEnum.ADMIN || this.currentUser.user?.role==RoleEnum.SUPERADMIN){
      this.reportService.closeReport(this.report!.id!).subscribe({
        next:(value:any)=>{
          this.report = value

        }
      })
    }

  }

  removeProduct() {
    if(this.currentUser.user?.role==RoleEnum.ADMIN || this.currentUser.user?.role==RoleEnum.SUPERADMIN) {
      this.adminService.deleteProduct1(this.report!.reportedProduct!.id!).subscribe({
        next:(value:any)=>{
          this.report = value
        }
      })

    }
  }

  banUser() {
    if(this.currentUser.user?.role==RoleEnum.ADMIN || this.currentUser.user?.role==RoleEnum.SUPERADMIN) {
      this.adminService.banUser(this.report!.reportedUser!.id!).subscribe({
        next:(value:any)=>{
          var ban = this.report!.reportedUser!
          this.report!.reportedUser! = {...ban, status: "BANNED"}
        }
      })
    }


  }

  unBanUser() {
    if(this.currentUser.user?.role==RoleEnum.ADMIN || this.currentUser.user?.role==RoleEnum.SUPERADMIN) {
      this.adminService .unbanUser(this.report!.reportedUser!.id!).subscribe({
        next:(value:any)=>{
          var ban = this.report!.reportedUser!
          this.report!.reportedUser! = {...ban, status: "ACTIVE"}

        }
      })
    }

  }
}
