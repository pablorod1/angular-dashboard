import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-pass-fullscreen',
  templateUrl: './forgot-pass-fullscreen.component.html',
  styleUrl: './forgot-pass-fullscreen.component.css'
})
export class ForgotPassFullscreenComponent {
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
