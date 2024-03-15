import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-unlock-modern',
  templateUrl: './unlock-modern.component.html',
  styleUrl: './unlock-modern.component.css'
})
export class UnlockModernComponent {
  hide = true;
  hidePassword = true;
  submitted = false;
  unlockForm!: FormGroup;
  user = { password: ''};

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.unlockForm = this.fb.group({
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
