import { Component, Inject} from "@angular/core";
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';


@Component({ selector:'app-dialog',
templateUrl: './dialog.component.html',
styleUrls: ['./dialog.component.css'],
standalone: true,
imports: [MatDialogModule, MatButtonModule],
})

export class DialogComponent {}