import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { BehaviorSubject } from 'rxjs';
//NUEVO
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostServiceUser{
   private isAuthenticated = new BehaviorSubject<boolean>(false);
    private users: User[] = []; //Primer matriz
    private usersUpdate = new Subject<User[]>();
    private adminLoggedIn = new BehaviorSubject<boolean>(false);
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
                    passwordC:user.passwordC,
                    isVerified:user.isVerified

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
    getAdminStatusListener() {
      return this.adminLoggedIn.asObservable();
    }

    setAdminStatus(isAdmin: boolean) {
      this.adminLoggedIn.next(isAdmin);
    }
    addUser(name: string, email: string, password: string, passwordC: string) {
      const user: User = { name, email, password, passwordC};
      this.http.post<{ message: string }>('http://localhost:2000/api/user', user)
          .subscribe({
              next: (responseData) => {
                  console.log(responseData.message);
                  this.users.push(user);
                  this.usersUpdate.next([...this.users]);
              },
              error: (error) => {
                  console.error(error);
              }
          });
    }

    deleteUser(userId: string | undefined): void {
        this.http.delete<{ message: string }>('http://localhost:2000/api/user/' + userId)
    .subscribe(response => {
      console.log(response.message);
      this.users = this.users.filter(user => user.id !== userId);
      this.usersUpdate.next([...this.users]);
    }, error => {
      console.error(error);
    });
      
      }
      

    login(email: string, password: string) {
        return this.http.post<{ message: string, user: User, isAdmin: boolean }>('http://localhost:2000/api/login', { email, password })
            .pipe(tap(response => {
              const isAdmin = response.isAdmin;
              this.adminLoggedIn.next(isAdmin);
            }));
    }

    loginAsAdmin() {
        this.adminLoggedIn.next(true);
      }

      loginUser() {
        this.adminLoggedIn.next(false);
      }

      logout() {
        this.adminLoggedIn.next(false);
        this.setAuth(false);
      }
      isAdminLoggedIn() {
        return this.adminLoggedIn.asObservable();
      }

      setAuth(isAuth: boolean) {
        this.isAuthenticated.next(isAuth);
      }
      getIsAuthenticated() {
        return this.isAuthenticated.asObservable();
      }
}


