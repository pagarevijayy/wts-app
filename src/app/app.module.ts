// package imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

// internal imports
import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './material.module';
import { httpInterceptorProviders } from './services/interceptors/interceptor-barrel';
import { environment } from '../environments/environment';

// components
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { TheScrollComponent } from './components/the-scroll/the-scroll.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { CommunityComponent } from './components/community/community.component';
import { RecommendedBooksComponent } from './components/recommended-books/recommended-books.component';
import { OtherComponent } from './components/other/other.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TheScrollComponent,
    DisciplineComponent,
    CommunityComponent,
    RecommendedBooksComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
