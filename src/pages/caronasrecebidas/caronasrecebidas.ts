import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';


@Component({
    selector: 'page-caronasrecebidas',
    templateUrl: 'caronasrecebidas.html'
})

export class CaronasRecebidasPage {
    
constructor( 
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
        this.alertCtrl.create({
        title: 'Troxa',
        buttons: [{text: 'OK'}],
        subTitle: 'Calma aí que a gente tá desenvolvendo.'
      }).present()
    }
}