import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './post-registro.component.html',
  styleUrls: ['./post-registro.component.css']
})
export class RegisterComponent {
  userType?: string; 
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';


  constructor() {
    this.userType = '';  
  }
  @Output() wantToLogin = new EventEmitter<void>();

  onWantToLogin() {
    this.wantToLogin.emit();
  }

  registerUser() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden.';
      return;
    }

    this.message = 'Usuario registrado con éxito!';
  }
}
