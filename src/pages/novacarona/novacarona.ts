import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
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
public dadosCarona = {
    idPartida: '',
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
    }

    verificaUsuario(){
      this.auth.auth.onAuthStateChanged(user => {
        this.usuarioLogado = user.email
      })
    }

    confirmaNovaCarona(){
        this.dadosCarona.idPartida = this.partida.idPartida;
        this.dadosCarona.email = this.usuarioLogado;
        this.listCaronas.push(this.dadosCarona).then(dadosCarona => {
            console.log(this.dadosCarona)
            this.alertCtrl.create({
                title: 'Carona cadastrada',
                buttons: [{text: 'OK'}],
                subTitle: 'Você criou carona para o jogo ' + this.partida.mandante.abreviacao + 'x' + this.partida.visitante.abreviacao
            }).present().then(() =>{
                this.navCtrl.push(HomePage)
            })
        }).catch(() => {
                this.alertCtrl.create({
                title: 'Erro',
                buttons: [{text: 'OK'}],
                subTitle: 'Não foi possível cadastrar a carona.'
            }).present()
        })
    }
}