import { Component, OnInit } from '@angular/core';
import { PostServiceUser } from '../users.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class AdminUsersComponent implements OnInit {
    users: User[] = [];
    private usersSub!: Subscription;
  
    constructor(public postServiceUser: PostServiceUser) {}
  
    ngOnInit() {
      this.postServiceUser.getUsers(); 
      this.usersSub = this.postServiceUser.getUsersUpdateListener()
        .subscribe((users: User[]) => {
          this.users = users;
        });
    }
  
    onAddUser(name: string, email: string, password: string, passwordC: string) {
      this.postServiceUser.addUser(name, email, password, passwordC);
    }
  
    onDeleteUser(userId: string | undefined) {
        this.postServiceUser.deleteUser(userId);

    }
  
    ngOnDestroy() {
      this.usersSub.unsubscribe(); 
    }
}