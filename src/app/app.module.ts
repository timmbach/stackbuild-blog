import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BlogComponent } from './components/blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppState } from './shared/store/global/App.state';
import { MaterialModule } from './Material.module';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './shared/store/blog/blog.effects';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    CreatepostComponent,
    DeleteDialogComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(AppState),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([BlogEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
