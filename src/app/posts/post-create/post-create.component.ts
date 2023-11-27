import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from "../Dialog/dialog.component";
import { ComponentProgressBar } from "../progressB/progress.component";
import { ProfeService } from "../profe.service";
import { Profe } from "../profe.model";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent{
  form: NgForm = new NgForm([], []); 
  profes: Profe[] = [];
  consentConfirmed = false; 
  selectedProfe: string = '';
  private profesSub!: Subscription;

  profeSeleccionado: Profe | null = null;  


  onProfeSelect(profe: Profe) {
    this.profeSeleccionado = profe;
  }


  constructor(public postsService: PostService, public dialog: MatDialog, private profeService: ProfeService, private fb: FormBuilder){}
  ngOnInit() {
    this.profeService.getProfe();
    this.profesSub =  this.profeService.getProfeUpdateListener()
      .subscribe((profes:Profe[])=>{
          this.profes = profes
      })
  }
  

  onAddPost(form: NgForm) {
    if (form.invalid || !this.selectedProfe) {
      return;
    }
    if (form.invalid) {
      return;
    }
    console.log(this.selectedProfe)
    this.postsService.addPost(form.value.name, form.value.date, form.value.time, form.value.phoneNumber, form.value.email, form.value.notes, form.value.consentConfirmation, this.selectedProfe);
    form.resetForm();
    this.consentConfirmed = false; 

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