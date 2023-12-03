import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServiceUser } from '../users.service';

@Component({
  selector: 'app-veri',
  templateUrl: './veri.component.html'
})
export class VerificacionComponent implements OnInit {
  mensaje: string = '';
  mensajeError: string = '';
  constructor(
    private postServiceUser: PostServiceUser,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.verificarUsuario(params['token']);
      }
    });
  }


  verificarUsuario(token: string) {
    this.postServiceUser.verificarUsuario(token).subscribe(
      respuesta => {
      },
      error => {
        if (error.status === 400) {
          this.mensajeError = 'El token de verificación es inválido o ya ha sido utilizado.';
        } else {
          this.mensajeError = 'Ha ocurrido un error inesperado durante la verificación.';
        }
      }
    );
  }
}
