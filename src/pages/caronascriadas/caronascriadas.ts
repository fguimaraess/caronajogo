import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-caronascriadas',
    templateUrl: 'caronascriadas.html'
})

export class CaronasCriadasPage {
public usuarioLogado;
public caronasUsuario;
private listCaronasRef;
private listCaronasUsuario;

constructor( 
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private auth: AngularFireAuth,
    private af: AngularFireDatabase) {
        this.verificaUsuario()
        this.listCaronasRef = af.object('caronas')
        this.listCaronasUsuario = this.listCaronasRef.valueChanges()
    //     this.alertCtrl.create({
    //     title: 'Troxa',
    //     buttons: [{text: 'OK', handler: () => {
    //         this.navCtrl.setRoot(HomePage)
    //     }}],
    //     subTitle: 'Calma aí que a gente tá desenvolvendo.'
    //   }).present()
    }
    verificaUsuario(){
      this.auth.auth.onAuthStateChanged(user => {
        this.usuarioLogado = user.email;
      })
    }

    ngOnInit(){
        this.getCaronasUsuario()
    }

    getCaronasUsuario(){
        console.log(this.listCaronasUsuario)
        this.listCaronasUsuario.subscribe(caronas => {
            var tmpCaronas = []
            console.log(caronas)
            for(var key in caronas) {
                console.log(caronas[key])
                if(caronas[key].email == this.usuarioLogado) {
                    tmpCaronas.push({
                        email: caronas[key].email,
                        local: caronas[key].local,
                        partida: caronas[key].idPartida
                    })
                }
            }
            console.log(tmpCaronas)
            this.caronasUsuario = tmpCaronas
        })
    }
}