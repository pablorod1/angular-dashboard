import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-unlock-classic',
  templateUrl: './unlock-classic.component.html',
  styleUrl: './unlock-classic.component.css'
})
export class UnlockClassicComponent {
  hide = true;
  hidePassword = true;
  submitted = false;
  unlockForm!: FormGroup;
  user = { email: '', password: ''};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.unlockForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.unlockForm.valid){
      alert('Form Submitted!');
    }
  }
}
