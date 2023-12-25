import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.development';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHotToastConfig } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [provideHotToastConfig()],
  bootstrap: [AppComponent]
})
export class AppModule { }
