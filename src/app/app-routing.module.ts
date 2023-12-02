import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './posts/Login/login.component';
import { RegisterComponent } from './posts/post-registro/post-registro.component';
import { TreeComponents } from './posts/tree/tree.component';
import { MatTabComponent } from './posts/mat-tab/mat-tab.component';
import { AdminUsersComponent } from './posts/Usuarios/usuarios.component';
import { UserCreateComponent } from './posts/user-create/usercreate.component';
import { verificacionComponent } from './posts/verificacion/veri.component';
import { PasComponent } from './posts/password/pas.component';
AdminUsersComponent
UserCreateComponent
verificacionComponent
PasComponent

const routes: Routes = [
  { path: '', component: TreeComponents },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ruta-admin', component: UserCreateComponent},
  { path: 'principal', component: TreeComponents },
  { path: 'UsuarioCita', component: MatTabComponent },
  { path: 'verificacion', component: verificacionComponent},
  { path: 'cambio', component: PasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
