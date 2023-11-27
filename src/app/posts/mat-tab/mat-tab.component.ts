import { Component, ViewEncapsulation } from "@angular/core";
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mat-tab',
  templateUrl: './mat-tab.component.html',
  styleUrls: ['./mat-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MatTabComponent {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  trackFoodBy(item: any) {
    return item.value; // o cualquier otra propiedad única de tus objetos 'food'
  }

}