import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService{

    private posts: Post[]= []; //!Primera matriz
    private postsUpdate = new Subject<Post[]>(); //!Actualizar

    getPosts(){
        return [...this.posts];  //!Segunda matriz
    } 
    getPostsUpdateListener(){
        return this.postsUpdate.asObservable();
    }

   
    addPost(id: string, name: string, date: Date, time: string, phoneNumber:string, email:string, notes: string, consentConfirmation:boolean){
        const post: Post = {
            id: id,
            name: name,
            date: date,
            time:time,
            phoneNumber: phoneNumber,
            email:email,
            notes:notes,
            consentConfirmation:consentConfirmation}
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]); //?Traer la copia
        
    }

    deletePost(post: Post) {
        const index = this.posts.indexOf(post);
             if (index !== -1) {
             this.posts.splice(index, 1);
             this.postsUpdate.next([...this.posts]); //?Borrar esa copia 
            }
      }
}

