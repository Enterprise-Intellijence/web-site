import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent {

  textAreaText?: string;
  bioText: string = "This is a long bio just to test how it is displayed in the textarea";
  maxBioLength: number = 500;
  // TODO: Get profile pic from user service
  profilePic: string = "";

  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 0 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    this.alertService.error('Error uploading file');
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  public close() {
    this.config.cancelReset = 0;
  }

  constructor(public alertService: AlertService) {}
}
