import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostServiceUser } from "../users.service";
@Component({
  selector: 'app-registro',
  templateUrl: './post-registro.component.html',
  styleUrls: ['./post-registro.component.css']
})
export class RegisterComponent {
  
  passwordMismatch = false;
  showSuccessDialog = false;

  form: NgForm = new NgForm([], []); 
  constructor(public postsServiceUser: PostServiceUser) {
  }

  onAddUser(form: NgForm){
    if(form.invalid){
     return
    }

    if (form.value.password !== form.value.passwordC) {
      this.passwordMismatch = true;
      return;
  } else {
      this.passwordMismatch = false;
      this.showSuccessDialog = true;
  }
     this.postsServiceUser.addUser(form.value.name, form.value.email, form.value.password, form.value.passwordC);
     form.resetForm();
    }


  @Output() wantToLogin = new EventEmitter<void>();


  onWantToLogin() {
    this.wantToLogin.emit();
  }

}
