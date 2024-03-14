import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-pass-modern',
  templateUrl: './forgot-pass-modern.component.html',
  styleUrl: './forgot-pass-modern.component.css'
})
export class ForgotPassModernComponent {
  hide = true;
  submitted = false;
  forgotForm!: FormGroup;
  user = { email: '', password: ''};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.forgotForm.valid){
      alert('Form Submitted!');
    }
  }
}
