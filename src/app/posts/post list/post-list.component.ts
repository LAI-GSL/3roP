import { Component, OnInit, OnDestroy, } from "@angular/core";
import {Post} from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";
import { ProfeService } from "../profe.service";
import { Profe } from "../profe.model";
import { User } from '../user.model';
import { PostServiceUser } from "../users.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  {
  posts: Post [] = [];
    private postsSub!: Subscription;
    private profesSub!: Subscription;
    profes: Profe[] = [];
    usuarioActual!: User;
    
    filterByUser = (post: Post) => !this.usuarioActual || post.id === this.usuarioActual.id;

    constructor(public postsService: PostService, private profeService: ProfeService){}

    ngOnInit() {
      this.profeService.getProfe();
      this.profesSub =  this.profeService.getProfeUpdateListener()
        .subscribe((profes:Profe[])=>{
            this.profes = profes
        })
        this.postsService.getPosts();
      this.postsSub =  this.postsService.getPostsUpdateListener()
        .subscribe((posts:Post[])=>{
            this.posts = posts
            
        })
    }

    getProfesionName(profesionId: string): string {
      const profesion = this.profes.find(profe => profe.id === profesionId);
      return profesion ? profesion.name : 'Profesional no encontrado'; 
    }


    ngOnDestroy() {
      this.postsSub.unsubscribe();
  }

    onDelete(postId: string | undefined) {
      if(postId){
        this.postsService.deletePost(postId)
      }
      
  }

  

  printCitas() {
    const printContentsElement = document.querySelector('.print-content');

    if (printContentsElement) {
        const printContents = printContentsElement.innerHTML;
        const popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');

        if (popupWin) {
            popupWin.document.open();
            popupWin.document.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                body {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    margin: 40px; 
                    padding: 0;
                    text-align: center;
                    position: relative;
                    border: 1px solid #000; 
                }
                .header-logo {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 100px;
                }
                h1 {
                    margin-top: 40px; 
                    margin-bottom: 50px; 
                    font-size: 24px;
                }
                .signature-line {
                    position: absolute;
                    bottom: 50px;
                    left: 50%; 
                    transform: translateX(-50%); 
                    width: 40%; 
                    border-top: 1px solid #000;
                    padding-top: 20px;
                }
                @media print {
                    .header-logo {
                        width: 100px;
                    }
                    button, .no-print, a[href], input, textarea, select, [role="button"] {
                        display: none !important;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                }
            </style>
            </head>
            <body onload="window.print();window.close()">
                <img class="header-logo" src="./assets/img/sello.png" alt="Cita verificada" />
                <h1>Cita verificada por SmartBooking</h1>
                ${printContents}
                <div class="signature-line">Firma de paciente:</div>
            </body>
            </html>`
            );
            popupWin.document.close();
        } else {
            console.error('No se pudo abrir la ventana de impresión. Es posible que un bloqueador de ventanas emergentes esté activo.');
        }
    } else {
        console.error('No se pudo imprimir porque no se encontró el elemento .print-content');
    }
  
}
 abrirModal(idModal: string) {
  const modal = document.getElementById(idModal);
  if (modal) {
      modal.style.display = 'block';
  }
}

cerrarModal(idModal: string) {
  const modal = document.getElementById(idModal);
  if (modal) {
      modal.style.display = 'none';
  }
}
}
