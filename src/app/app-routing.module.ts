import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './posts/Login/login.component';
import { RegisterComponent } from './posts/post-registro/post-registro.component';
import { TreeComponent } from './posts/tree/tree.component';
import { MatTabComponent } from './posts/mat-tab/mat-tab.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: TreeComponent },
  { path: 'UsuarioCita', component: MatTabComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
