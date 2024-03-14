import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) {
    return null;
  }
  return newPassword.value === confirmPassword.value ? null : {passwordsNotMatching: true};
};
@Component({
  selector: 'app-reset-pass-classic',
  templateUrl: './reset-pass-classic.component.html',
  styleUrl: './reset-pass-classic.component.css'
})
export class ResetPassClassicComponent {
  hide = true;
  submitted = false;
  resetForm!: FormGroup;
  user = {password: '', newPassword: '', confirmPassword: ''};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },{validator: confirmPasswordValidator});
  }
  onSubmit(){
    this.submitted = true;
    if (this.resetForm.valid){
      alert('Form Submitted!');
    }
  }
}
