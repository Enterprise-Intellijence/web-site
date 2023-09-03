import { Component, Input } from '@angular/core';
import { AdminControllerService, ReportControllerService, ReportDTO, UserDTO } from "../../../services/api-service";
import { CurrentUserService } from "../../../services/current-user.service";
import RoleEnum = UserDTO.RoleEnum;
import StatusEnum = UserDTO.StatusEnum;
import { faUserSlash, faAddressCard, faUser, faBoxesPacking, faTrashCan, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report-single-view',
  templateUrl: './report-single-view.component.html',
  styleUrls: ['./report-single-view.component.scss']
})
export class ReportSingleViewComponent {

  @Input() report?: ReportDTO

  faUserSlash = faUserSlash;
  faAddressCard = faAddressCard;
  faUser = faUser;
  faBoxesPacking = faBoxesPacking;
  faTrashCan = faTrashCan;
  faBoxArchive = faBoxArchive;

  constructor(private reportService: ReportControllerService, private currentUser: CurrentUserService, private adminService: AdminControllerService) {
  }

  closeReport() {
    if (this.currentUser.user?.role == RoleEnum.ADMIN || this.currentUser.user?.role == RoleEnum.SUPERADMIN) {
      this.reportService.closeReport(this.report!.id!).subscribe({
        next: (value: any) => {
          this.report = value
        }
      })
    }

  }

  removeProduct() {
    if (this.currentUser.user?.role == RoleEnum.ADMIN || this.currentUser.user?.role == RoleEnum.SUPERADMIN) {
      this.adminService.deleteProduct1(this.report!.reportedProduct!.id!).subscribe({
        next: (value: any) => {
          this.report = value
        }
      })
    }
  }

  banUser() {
    if (this.currentUser.user?.role == RoleEnum.ADMIN || this.currentUser.user?.role == RoleEnum.SUPERADMIN) {
      this.adminService.banUser(this.report!.reportedUser!.id!).subscribe({
        next: (value: any) => {
          var ban = this.report!.reportedUser!
          this.report!.reportedUser! = { ...ban, status: "BANNED" }
        }
      })
    }


  }

  unBanUser() {
    if (this.currentUser.user?.role == RoleEnum.ADMIN || this.currentUser.user?.role == RoleEnum.SUPERADMIN) {
      this.adminService.unbanUser(this.report!.reportedUser!.id!).subscribe({
        next: (value: any) => {
          var ban = this.report!.reportedUser!
          this.report!.reportedUser! = { ...ban, status: "ACTIVE" }

        }
      })
    }

  }
}
