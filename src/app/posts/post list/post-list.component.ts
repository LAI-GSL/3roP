import { Component, OnInit, OnDestroy, } from "@angular/core";
import {Post} from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  {

  posts: Post [] = [];
    private postsSub!: Subscription;

    constructor(public postsService: PostService){}

    ngOnInit() {
        this.postsService.getPosts();
      this.postsSub =  this.postsService.getPostsUpdateListener()
        .subscribe((posts:Post[])=>{
            this.posts = posts
        })
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
              margin: 0;
              padding: 0;
              position: relative;
            }
            .header-image {
              position: absolute;
              top: 0; /* Ajusta la distancia desde la parte superior de la página */
              right: 100; /* Ajusta la distancia desde la parte derecha de la página */
              width: 20px; /* Ancho de la imagen */
              height: auto; /* Altura automática para mantener la proporción */
            }
            @media print {
              .header-image {
                width: 100px; /* Puede que necesites ajustar el ancho para la impresión */
              }
      
            h1, h2, h3 {
              color: #333;
              margin-top: 10px;
              margin-bottom: 10px;
              font-weight: normal;
            }
      
            h1 {
              font-size: 24px;
            }
      
            h2 {
              font-size: 20px;
            }
      
            h3 {
              font-size: 18px;
            }
      
            p {
              font-size: 14px;
              line-height: 1.6;
              margin-top: 5px;
              margin-bottom: 5px;
            }
      
            button, .no-print, a[href], input, textarea, select, [role="button"] {
              display: none !important;
            }
      
            img {
              max-width: 100%;
              height: auto;
            }

            ul, ol {
              padding-left: 20px;
              margin-top: 5px;
              margin-bottom: 5px;
            }
      
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
      
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
      
            th {
              background-color: #f8f8f8;
            }

          </style>
        </head>
        <body onload="window.print();window.close()">
        <img src="./assets/img/sello.png" alt="Cita verificada" />
          <!-- Aquí va el contenido a imprimir -->
          ${printContents}
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
  
  
}
