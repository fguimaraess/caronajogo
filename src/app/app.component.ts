import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CaronasCriadasPage } from '../pages/caronascriadas/caronascriadas';
import { CaronasRecebidasPage } from '../pages/caronasrecebidas/caronasrecebidas';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;

  public pages = [
    { title: 'Home', component: HomePage  },
    { title: 'Caronas recebidas', component: CaronasRecebidasPage },
    { title: 'Caronas criadas', component: CaronasCriadasPage }
  ]

  @ViewChild(Nav) public nav: Nav
  
  constructor(platform: Platform,
    private afAuth:AngularFireAuth,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    this.afAuth.authState.subscribe(auth => {
      if(!auth) this.rootPage = LoginPage;
      else this.rootPage = HomePage;
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component == HomePage) this.nav.setRoot(page.component);
    else this.nav.push(page.component);
  }
}

