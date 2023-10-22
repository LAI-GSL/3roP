import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from "../Dialog/dialog.component";
import { ComponentProgressBar } from "../progressB/progress.component";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent{
  form: NgForm = new NgForm([], []); 

  constructor(public postsService: PostService, public dialog: MatDialog,){}

  onAddPost(form: NgForm){
  if(form.invalid){
   return;
  }
  this.postsService.addPost(form.value.id, form.value.name, form.value.date, form.value.time, form.value.phoneNumber, form.value.email, form.value.notes, form.value.consentConfirmation);
     form.resetForm();
  }

openDialog() {

  const MatDialogRef = this.dialog.open(ComponentProgressBar,{
    width: '500px',
    disableClose: true
  });
setTimeout(() => {
  const dialogRef = this.dialog.open(DialogComponent,{
});

dialogRef.afterClosed().subscribe(result => {
  console.log('Close');
})

MatDialogRef.close();
  },500)

}

}