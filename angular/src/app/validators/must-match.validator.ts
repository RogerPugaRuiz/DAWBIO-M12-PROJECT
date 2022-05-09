import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('signUpPassword');
    const confirmPassword = control.get('signUpConfirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
        // set error in confirm password
        confirmPassword?.setErrors({ notmatched: true });
    }
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };
  