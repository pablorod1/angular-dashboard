import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signin-classic',
  templateUrl: './signin-classic.component.html',
  styleUrl: './signin-classic.component.css'
})
export class SigninClassicComponent {
  hide = true;
  submitted = false;
  signinForm!: FormGroup;
  user = { email: '', password: ''};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.signinForm.valid){
      alert('Form Submitted!');
    }
  }
}
