import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarComponent } from './posts/tool-bar/tool-bar.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
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
import { TreeComponent } from './posts/tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PostCreateComponent,
    FooterComponent,
    PostListComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
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
    TreeComponent
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
