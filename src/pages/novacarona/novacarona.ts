import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-novacarona',
    templateUrl: 'novacarona.html'
})


export class NovaCaronaPage {

public listCaronas;
public partida;
public usuarioLogado;
private alerta: Alert

public dadosCarona = {
    idPartida: '',
    abrevPartida: '',
    email: '',
    hora: '',
    local: '',
    placa: '',
    vagas: ''
}

constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    private auth: AngularFireAuth) {
        this.verificaUsuario()
        this.partida = this.navParams.get('partidaEscolhida')
        this.listCaronas = af.list('/caronas')
        console.log(this.partida)

        this.alerta = this.alertCtrl.create({
            buttons: [{text: 'OK', handler: () => {
            this.navCtrl.setRoot(HomePage)
          }}]
        })
    }

    verificaUsuario(){
      this.auth.auth.onAuthStateChanged(user => {
        this.usuarioLogado = user.email
      })
    }

    confirmaNovaCarona(){
        this.dadosCarona.idPartida = this.partida.idPartida;
        this.dadosCarona.email = this.usuarioLogado;
        this.dadosCarona.abrevPartida = this.partida.mandante.abreviacao + 'x' + this.partida.visitante.abreviacao
        this.listCaronas.push(this.dadosCarona).then(dadosCarona => {
            console.log(this.dadosCarona)
            this.alerta.setTitle('Carona cadastrada');
            this.alerta.setSubTitle('Você criou carona para o jogo ' + this.partida.mandante.abreviacao + 'x' + this.partida.visitante.abreviacao);
            this.alerta.present();    
            }).catch(() => {
                this.alerta.setTitle('Erro')
                this.alerta.setSubTitle('Não foi possível cadastrar a carona.')
                this.alerta.present()
        })
    }
}