import { HomeModule } from './home/home.module';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbActionsModule, NbUserModule, NbMenuModule, NbContextMenuModule, NbMenuService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { NbFirebaseGoogleStrategy, NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
   
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    HomeModule
 


  ],
  providers: [NbMenuService ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
