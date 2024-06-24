import { AbstractControl, AsyncValidatorFn, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { map } from 'rxjs/operators';

//Esta expresión regular validará si el texto contiene al menos una minuscula, mayuscula, número, symbolo y que la longitud sea mayor o igual a 8
const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');

/**
 * Esta función la usaremos para el campo de "password"
 * @param control
 * @returns
 */
export const customPasswordValidator = (control: AbstractControl<string>): ValidationErrors | null => {
	const value = control.value;

	if (!patternPassword.test(value)) {
		return { customPasswordValidator: true };
	}

	return null;
};

/**
 * Esta función la usaremos para realizar la validación cruzada entre los campos "password" y "confirmPassword"
 * @param formGroupControl
 * @returns
 */

export const crossPasswordMatchingValidatior: ValidatorFn = (
	formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>
): ValidationErrors | null => {
	const password = formGroupControl.value.password;
	const confirmPassword = formGroupControl.value.confirmPassword;

	return password !== confirmPassword ? { crossConfirmPasswordError: true } : null;
};

