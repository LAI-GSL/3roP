import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showHeaderFooter = event.url === '/principal' || event.url === '/UsuarioCita' || event.url === '/';
        this.showLoginRegister = event.url !== '/UsuarioCita';
      });     
}

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

}
