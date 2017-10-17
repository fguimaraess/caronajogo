import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  loginData = {
    email: '',
    password: ''
  }
  
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        this.navCtrl.push(HomePage, {emailUsuario: this.loginData.email});
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }

  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }

}