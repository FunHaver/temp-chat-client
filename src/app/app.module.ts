import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestApiService } from './services/rest-api.service';
import { AppRoutingModule } from './app-routing.module';
import { SessionStorageService } from './services/session-storage.service';
import { HeaderComponent } from './header/header.component';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        HomeComponent,
        ReactiveFormsModule,
        AppRoutingModule], providers: [RestApiService, SessionStorageService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
