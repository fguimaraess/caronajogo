import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };
  public listUsuarios
  public novoUsuario = {
    email: '',
    password: '',
    uid: ''
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    public af: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
            this.signupData.email = this.navParams.get('email');
            this.listUsuarios = af.list('/usuarios')
  }
  
  signup() {
    if(this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        message: 'As senhas digitadas não são iguais',
        buttons: ['OK']
      });
      alert.present();
      return;
    } 

    //Firebase signup code
    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
    .then(auth => {
      this.criaUsuario()
      
    })
    .catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }
  
  criaUsuario(){
    this.novoUsuario.email = this.signupData.email
    this.novoUsuario.password = this.signupData.password
    this.listUsuarios.push(this.novoUsuario)
  }

}
