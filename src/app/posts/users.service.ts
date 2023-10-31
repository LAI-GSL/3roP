import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
//NUEVO
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostServiceUser{

    private users: User[] = []; //Primer matriz
    private usersUpdate = new Subject<User[]>();

    constructor(private http: HttpClient){}
    getUsers(){
        this.http.get<{message: string, users:any}>('http://localhost:2000/api/user')
        .pipe(map((userData)=>{
            return userData.users.map((user:any) =>{
                return{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    password:user.password,
                    passwordC:user.passwordC

                };
            });
        }))
        .subscribe((publicacionTransformada) =>{
            this.users = publicacionTransformada;
            this.usersUpdate.next([...this.users]);
        });
    }
    getUsersUpdateListener(){ 
        return this.usersUpdate.asObservable();
    }
    addUser(name: string, email: string, password: string, passwordC: string) {
        const user: User = {
            name: name,
            email: email,
            password: password,
            passwordC: passwordC
        }

        this.http.post<{ message: string }>('http://localhost:2000/api/user', user)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.users.push(user);
                this.usersUpdate.next([...this.users]);
            });
    }

    deleteUser(userId: string) {
        this.http.delete("http://localhost:2000/api/user/" + userId)
            .subscribe(() => {
                console.log('Eliminado');
            });
    }}


