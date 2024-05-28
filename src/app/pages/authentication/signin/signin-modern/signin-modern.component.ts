import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin-modern',
  templateUrl: './signin-modern.component.html',
  styleUrl: './signin-modern.component.css',
  providers: [MessageService],
})
export class SigninModernComponent {
  hide = true;
  hidePassword = true;
  submitted = false;
  signinForm!: FormGroup;
  user = { email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private permissionsService: NgxPermissionsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: [false],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      if (this.signinForm.get('role')?.value) {
        const permissions = ['SELLER'];
        this.permissionsService.loadPermissions(permissions);
        // Guardar en localhost
        localStorage.setItem('role', 'SELLER');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged in as Seller',
        });
      } else {
        const permissions = ['CLIENT'];
        this.permissionsService.loadPermissions(permissions);
        // Guardar en localhost
        localStorage.setItem('role', 'CLIENT');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged in as Client',
        });
      }
    }
  }

}
