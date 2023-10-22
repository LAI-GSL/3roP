import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  standalone: true,
  imports: [MatProgressBarModule],
})
export class ComponentProgressBar {}