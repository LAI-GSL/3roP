import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from '@angular/router';
import { PostServiceUser } from "../users.service";


@Component({
    selector:'app-login',
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

  constructor(private router: Router ,private authService: PostServiceUser) { }

  ngOnInit(): void {
  }

  clearFields(): void {
    this.userValue = '';
    this.passwordValue = '';
  }

  validateAccess(): void {
    this.authService.login(this.userValue, this.passwordValue).subscribe(
      data => {
        console.log("Login response:", data);
        if (data.user && data.user.isVerified) {
          this.authService.setAdminStatus(data.isAdmin); 
          this.authService.setAuth(true);
          this.message = 'Acceso correcto';
          if (data.isAdmin) {
            console.log("Usuario es admin, redirigiendo...");
            this.router.navigate(['/ruta-admin']);
          } else {
            this.router.navigate(['/UsuarioCita']);
          }
        } else {
          this.message = 'Por favor verifica tu cuenta antes de iniciar sesión.';
          this.clearFields();
        }
      },
      error => {
        console.error("Login error:", error);
        this.message = error.error.message || 'Error durante el inicio de sesión';
        this.clearFields();
      }
    );
  }

  reistrar() {
    this.router.navigate(['/register']);
}

}


