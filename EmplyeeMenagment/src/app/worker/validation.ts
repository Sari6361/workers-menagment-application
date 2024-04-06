import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function DateValidator(control: FormControl): ValidationErrors | null {
    let today: Date = new Date();
    if (new Date(control.value) < today)
        return { "LessThanToday": true };
    return null;
}
