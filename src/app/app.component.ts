import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PostServiceUser } from './posts/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SmartBooking';
  
  showLoginForm = false;
  showRegister = false;
  showHeaderFooter = false;
  showLoginRegister = true;
  private routerSub!: Subscription;
  private adminStatusSub!: Subscription; 
  showAdminComponents = false;
  showUserComponents = false;
  shouldShowTree: boolean = true;
  showTreeComponent: boolean = true;
  constructor(private router: Router, private userService: PostServiceUser) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.shouldShowTree = !event.url.startsWith('/register');

      }
    });
  }

  ngOnInit(): void {

    this.adminStatusSub = this.userService.isAdminLoggedIn().subscribe(isAdmin => {
      this.showAdminComponents = isAdmin; 
      this.showUserComponents = !isAdmin; 
      if (isAdmin) {
        this.router.navigate(['/ruta-admin']); 
      }
    });
    this.routerSub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showAdminComponents = event.url === '/ruta-admin';
        this.showHeaderFooter = event.url === '/principal' || event.url === '/UsuarioCita'|| event.url ==='/ruta-admin'|| event.url === '/';
        this.showLoginRegister = event.url !== '/UsuarioCita';
      });     
      
}

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.adminStatusSub) {
      this.adminStatusSub.unsubscribe();
    }
  }
}
