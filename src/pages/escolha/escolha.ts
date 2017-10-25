import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { NovaCaronaPage } from '../novacarona/novacarona';
import { QueroCaronaPage } from '../querocarona/querocarona';
@Component({
    templateUrl: 'escolha.html'
})

export class EscolhaPage {
    
public partida;

constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
        this.partida = this.navParams.get('partidaEscolhida')
        
    }

    novaCarona(partida) {
     this.navCtrl.push(NovaCaronaPage, {partidaEscolhida: partida})
   }

   queroCarona(partida){
       this.navCtrl.push(QueroCaronaPage, {partidaEscolhida: partida})
    //     this.alertCtrl.create({
    //     title: 'Troxa',
    //     buttons: [{text: 'OK'}],
    //     subTitle: 'Calma aí que a gente tá desenvolvendo.'
    //   }).present()
    }
}