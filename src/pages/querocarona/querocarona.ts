import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-querocarona',
    templateUrl: 'querocarona.html'
})

export class QueroCaronaPage {

private listCaronasRef;
private listCaronas;
public partida;
public dadosCarona = [];
public usuarioLogado;
private alerta: Alert

    constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    private auth: AngularFireAuth) {
        this.partida = this.navParams.get('partidaEscolhida')
        this.listCaronasRef = af.object('caronas')
        this.listCaronas = this.listCaronasRef.valueChanges()

        this.alerta = this.alertCtrl.create({
            buttons: [{text: 'OK', handler: () => {
            this.navCtrl.setRoot(HomePage)
          }}]
        })
    }

  ngOnInit() {
    this.verificaUsuario();
    this.getDadosCarona()
  }

  verificaUsuario(){
      this.auth.auth.onAuthStateChanged(user => {
        this.usuarioLogado = user.email;
      })
    }

    getDadosCarona() {
        this.listCaronas.subscribe(caronas => {
            var tempCaronas = []
            for(var key in caronas) {
                if(caronas[key].idPartida == this.partida.idPartida){
                    tempCaronas.push({
                        idPartida: caronas[key].idPartida,
                        emailCriadorCarona: caronas[key].email,
                        emailUsuarioCarona: this.usuarioLogado,
                        hora: caronas[key].hora,
                        local: caronas[key].local,
                        placa: caronas[key].placa,
                        vagas: caronas[key].vagas
                    }) 
                }
            }
            this.dadosCarona = tempCaronas
        })
    }

    pedirCarona(carona) {
        console.log(carona)
    }
}