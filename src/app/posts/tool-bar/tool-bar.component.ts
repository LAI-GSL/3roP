import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd  } from '@angular/router';
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
    isOnMainPage: boolean = true;
    isAdmin: boolean = false;

    constructor(private router: Router, private serviceUser: PostServiceUser) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isOnMainPage = (event.url === '/' || event.url === '/principal');
        }
      });
    }

    ngOnInit(): void {
        this.serviceUser.getIsAuthenticated()
          .subscribe(isAuthenticated => {
            this.isUserAuthenticated = isAuthenticated;
          });
          this.serviceUser.isAdminLoggedIn()
          .subscribe(isAdmin => {
            this.isAdmin = isAdmin;
          });
      }    

    onLogout() {
        this.serviceUser.logout(); 
        this.router.navigate(['/']); 
    }
    
}