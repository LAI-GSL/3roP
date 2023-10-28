import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent{
  userValue: string = '';
  passwordValue: string = '';
  message: string = ''; 

  @Output() wantToRegister = new EventEmitter<void>();

  onWantToRegister() {
    this.wantToRegister.emit();
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clearFields(): void {
    this.userValue = '';
    this.passwordValue = '';
  }

  validateAccess(): void {
    const validCredentials = [
      { user: 'SA', password: 'SA' },
      { user: 'ADMIN', password: 'JHON' },
      { user: 'LAISHA', password: 'SOTO' }
    ];

    if (validCredentials.some(cred => cred.user === this.userValue && cred.password === this.passwordValue)) {
      this.message = 'Acceso correcto';
      this.router.navigate(['/UsuarioCita']);
    } else {
      this.message = 'Acceso denegado';
    }

    this.clearFields();
  }

  

}


