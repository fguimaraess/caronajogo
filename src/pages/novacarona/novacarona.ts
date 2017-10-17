import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'page-novacarona',
    templateUrl: 'novacarona.html'
})

export class NovaCaronaPage {
    
public partida;
public usuarioLogado;

constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private auth: AngularFireAuth) {
        this.verificaUsuario()
        this.partida = this.navParams.get('partidaEscolhida')
        console.log(this.partida)
    }

    verificaUsuario(){
      this.auth.auth.onAuthStateChanged(user => {
        this.usuarioLogado = user.email
      })
    }

    confirmaNovaCarona(){
        this.alertCtrl.create({
        title: 'Troxa',
        buttons: [{text: 'OK'}],
        subTitle: 'Calma aí que a gente tá desenvolvendo.'
      }).present()
    }

}