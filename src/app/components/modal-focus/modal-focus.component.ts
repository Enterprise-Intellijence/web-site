import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Profile deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete your profile?</strong>
			</p>
			<p>
				All information associated to your profile will be permanently deleted.
				<span class="text-danger">This operation can not be undone.<br></span>
			</p>

			<p>
				Please enter the <b>email address</b> associated to this account to confirm the deletion:
			<p>

			<!--TODO: take email from input-->
			<input type="text" class="form-control" placeholder="Email address" />

		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Confirm</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}

	//TODO: check email taken from input
}

@Component({ selector: 'ngbd-modal-focus', standalone: true, templateUrl: './modal-focus.component.html' })
export class NgbdModalFocus {
	withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

	@Input() email?: string;

	constructor(private _modalService: NgbModal) {}

	open() {
		this._modalService.open(NgbdModalConfirm);
	}
}