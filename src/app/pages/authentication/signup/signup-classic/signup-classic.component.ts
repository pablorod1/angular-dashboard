import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }
  return password.value === confirmPassword.value ? null : {passwordsNotMatching: true};
};

@Component({
  selector: 'app-signup-classic',
  templateUrl: './signup-classic.component.html',
  styleUrl: './signup-classic.component.css'
})
export class SignupClassicComponent implements OnInit{
  hide = true;
  hidePassword = true;
  submitted = false;
  signupForm!: FormGroup;
  user = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeTerms: false};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    },{validator: confirmPasswordValidator});
  }
  onSubmit(){
    this.submitted = true;
    if (this.signupForm.valid){
      alert('Form Submitted!');
    }
  }
}
