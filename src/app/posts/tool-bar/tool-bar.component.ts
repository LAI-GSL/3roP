import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { PostServiceUser } from "../users.service";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.css']
})

export class ToolbarComponent{

    esAdmin: boolean = false;
    @Input() showLogoutButton = false;
    isUserAuthenticated: boolean = false;

    constructor(private router: Router, private serviceUser: PostServiceUser) {}

    ngOnInit(): void {
        this.serviceUser.getIsAuthenticated()
          .subscribe(isAuthenticated => {
            this.isUserAuthenticated = isAuthenticated;
          });
      }    

    onLogout() {
        this.serviceUser.logout(); 
        this.router.navigate(['/']); 
    }
    
}