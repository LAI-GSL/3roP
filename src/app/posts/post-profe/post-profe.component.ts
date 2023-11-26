import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProfeService } from "../profe.service";


@Component({
    selector: 'app-post-profe',
    templateUrl: './post-profe.component.html',
    styleUrls: ['./post-profe.component.css'],
})

export class PostProfeComponent{
    form: NgForm = new NgForm([], []); 
    consentConfirmed = false; 
    constructor(public profeService: ProfeService){}
  
    onAddProfe(form: NgForm){
    if(form.invalid){
     return;
    }
    this.profeService.addPost(form.value.name, form.value.profesion ,form.value.phoneNumber, form.value.email, form.value.direction, form.value.country);
       form.resetForm();
       this.consentConfirmed = false;
    }
  
}