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
        
        this.listCaronasUsuario.subscribe(caronas => {
            var tmpCaronas = []
            
            for(var key in caronas) {
                
                if(caronas[key].email == this.usuarioLogado) {
                    tmpCaronas.push({
                        email: caronas[key].email,
                        local: caronas[key].local,
                        partida: caronas[key].abrevPartida,
                        uid: key
                    })
                }
            }
            
            this.caronasUsuario = tmpCaronas
        })
    }

    excluirCarona(carona) {
        let alert = this.alertCtrl.create({
            title: 'Excluir',
            message: 'Deseja excluir a carona?',
            buttons: [
                { text: 'Sim', handler: () => {
                   this.af.object('caronas/' + carona.uid).remove();     
                }},
                { text: 'Não' }
            ]
        })
        alert.present()
    }
}