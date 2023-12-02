import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
    selector: 'app-password',
    templateUrl: './pas.component.html',
    styleUrls: ['./pas.component.css']
})
export class PasComponent {
    userValue: string = '';
    passwordValue: string = '';
    message: string = ''; 
  constructor(private http: HttpClient) {}

  onConsultarClick() {
    if (this.validateEmail(this.userValue)) {
        this.http.post('http://localhost:2000/api/recuperar', { email: this.userValue })
            .subscribe(response => {
                this.message = 'Correo electrónico enviado con éxito.';
            }, error => {
                this.message = 'Error al enviar el correo electrónico.';
            });
    } else {
        this.message = 'Por favor, introduce un correo electrónico válido.';
    }
}

validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
}