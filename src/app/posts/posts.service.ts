import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
//NUEVO
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService{

    private posts: Post[] = []; //Primer matriz
    private postsUpdate = new Subject<Post[]>();

    constructor(private http: HttpClient){}
    getPosts(){
        this.http.get<{message: string, posts:any}>('http://localhost:3000/api/post')
        .pipe(map((postData)=>{
            return postData.posts.map((post:any) =>{
                return{
                    name: post.name,
                    date: post.date,
                    id: post._id,
                    time: post.time,
                    phoneNumber: post.phoneNumber,
                    email: post.email,
                    notes: post.notes,
                    consentConfirmation: post.consentConfirmation,
                    profesion: post.profesion
                    

                };
            });
        }))
        .subscribe((publicacionTransformada) =>{
            this.posts = publicacionTransformada;
            this.postsUpdate.next([...this.posts]);
        });
    }
    getPostsUpdateListener(){ //FUNCION DE OBSERVABLE
        return this.postsUpdate.asObservable();
    }
    addPost(name: string, date: Date, time: string, phoneNumber: string, email:string, notes:string, consentConfirmation:boolean, profesion: string){
        const post: Post = { 
            name: name,
            date: date,
            time:time, 
            phoneNumber:phoneNumber,
            email:email,
            notes:notes,
            consentConfirmation:consentConfirmation,
            profesion: profesion
            }
        this.http.post<{message: string}>('http://localhost:3000/api/post', post)
        .subscribe((responseData) =>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]);
        });    
        
    }
    //AGREGUÉ ESTO
    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/post/" + postId)
        .subscribe(()=>{
            console.log('Eliminado')
            this.getPosts();
        });
      }

}
