import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EscolhaPage } from '../pages/escolha/escolha';
import { NovaCaronaPage } from '../pages/novacarona/novacarona';
import { QueroCaronaPage } from '../pages/querocarona/querocarona';
import { CaronasCriadasPage } from '../pages/caronascriadas/caronascriadas';
import { CaronasRecebidasPage } from '../pages/caronasrecebidas/caronasrecebidas';
import { PerfilPage } from '../pages/perfil/perfil';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAW1Pe1a1MYRljSsUV-iNa291tAf4Bsaw0",
    authDomain: "caronajogo.firebaseapp.com",
    databaseURL: "https://caronajogo.firebaseio.com",
    projectId: "caronajogo",
    storageBucket: "caronajogo.appspot.com",
    messagingSenderId: "301519583196"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    EscolhaPage,
    NovaCaronaPage,
    QueroCaronaPage,
    CaronasCriadasPage,
    CaronasRecebidasPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    EscolhaPage,
    NovaCaronaPage,
    QueroCaronaPage,
    CaronasCriadasPage,
    CaronasRecebidasPage,
    PerfilPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera
    ]
})
export class AppModule {}