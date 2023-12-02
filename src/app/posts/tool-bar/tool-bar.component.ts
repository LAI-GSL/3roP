import { Component, Input, OnInit } from "@angular/core";
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { PostServiceUser } from "../users.service";
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.css']
})
export class ToolbarComponent implements OnInit {

    @Input() showLogoutButton = false;
    isUserAuthenticated: boolean = false;
    isOnMainPage: boolean = true;
    isAdmin: boolean = false;
    isLoggedIn: boolean = false;

    constructor(private router: Router, private serviceUser: PostServiceUser) {}

    ngOnInit(): void {
        this.serviceUser.getIsAuthenticated()
            .subscribe(isAuthenticated => {
                this.isUserAuthenticated = isAuthenticated;
            });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isOnMainPage = event.url === '/principal' || event.url === '/register' || event.url === '/cambio';
            }
        });
    }

    onLogout() {
        this.router.navigate(['/principal']);
    }
}
