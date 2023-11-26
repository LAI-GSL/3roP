import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarComponent } from './posts/tool-bar/tool-bar.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabContent, MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FooterComponent } from './posts/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { PostListComponent } from './posts/post list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PostService } from './posts/posts.service';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './posts/table/table.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTreeModule} from '@angular/material/tree'; 
import { TreeComponents } from './posts/tree/tree.component';
import { LoginComponent } from './posts/Login/login.component';
import { RegisterComponent } from './posts/post-registro/post-registro.component';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatTabComponent } from './posts/mat-tab/mat-tab.component';
import {HttpClientModule} from '@angular/common/http';
import { PostServiceUser } from './posts/users.service';
import { AdminUsersComponent } from './posts/Usuarios/usuarios.component';
import {UserCreateComponent} from './posts/user-create/usercreate.component'
import { PostProfeComponent } from './posts/post-profe/post-profe.component';
import { ProfeListComponent } from './posts/profe-list/profe-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PostCreateComponent,
    FooterComponent,
    PostListComponent,
    TableComponent,
    LoginComponent,
    RegisterComponent,
    MatTabComponent,
    AdminUsersComponent,
    UserCreateComponent,
    TreeComponents,
    PostProfeComponent,
    ProfeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatTreeModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [PostService, PostServiceUser],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
