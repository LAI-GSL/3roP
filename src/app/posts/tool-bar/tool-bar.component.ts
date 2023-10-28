import { Component, Input} from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.css']
})

export class ToolbarComponent{

    @Input() showLogoutButton = false;

    constructor(private router: Router) {}

    onLogout() {
        this.router.navigate(['/principal']); 
    }
}