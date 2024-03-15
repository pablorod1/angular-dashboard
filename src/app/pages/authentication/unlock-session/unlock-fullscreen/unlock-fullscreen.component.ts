import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-unlock-fullscreen',
  templateUrl: './unlock-fullscreen.component.html',
  styleUrl: './unlock-fullscreen.component.css'
})
export class UnlockFullscreenComponent {
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
