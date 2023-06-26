import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[passwordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordMatchValidatorDirective implements Validator {
  @Input('passwordMatch') passwordControlName?: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const confirmPassword = control.parent?.get(this.passwordControlName!)?.value;

    if (password !== confirmPassword) {
      return { passwordMatch: true }; // Passwords don't match, validation failed
    }
    return null; // Passwords match, validation passed
  }
}
