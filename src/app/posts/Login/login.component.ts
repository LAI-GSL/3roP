import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from '@angular/router';
import { PostServiceUser } from "../users.service";


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
          this.message = 'Acceso correcto';
          this.router.navigate(['/UsuarioCita']);
      },
      error => {
          this.message = 'Esos datos no pertenecen a una cuenta registrada';
      }
  );
}

}


