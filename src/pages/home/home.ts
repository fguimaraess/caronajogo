import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http, RequestOptions, Headers } from '@angular/http';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
public partidasDaRodada;
public todasPartidas;

constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private loadingCtrl: LoadingController,
  private alertCtrl: AlertController,
  private http: Http,
  private auth: AngularFireAuth) { }

  httpGet(url) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Origin', '*');
    var options = new RequestOptions({ headers: myHeaders });

    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  formataData(data){
    var dataRaw = data.split(' ')[0].split('-')
    return new Date(dataRaw[0], (dataRaw[1] - 1), dataRaw[2]) 
  }

  getPartidas(rodada){
    let url = 'https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/partidas/' + rodada
    return this.httpGet(url).catch( () => {
      url = 'https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/partidas/' + (rodada - 1)
      return this.httpGet(url)
    })
  }


  getRodadaAtual(dados){
    let dataAtual = new Date()
    let rodadaAnterior;

    for(var i = 0; i < dados.length; i++){
      var dataInicioRodadaRaw = dados[i].inicio.split(' ')[0].split('-')
      var horaInicioRodadaRaw = dados[i].inicio.split(' ')[1].split(':')
      var dataInicioRodada = new Date(dataInicioRodadaRaw[0], (dataInicioRodadaRaw[1] - 1), dataInicioRodadaRaw[2], horaInicioRodadaRaw[0], horaInicioRodadaRaw[1], horaInicioRodadaRaw[2]) 

      var dataFimRodadaRaw = dados[i].fim.split(' ')[0].split('-')
      var horaFimRodadaRaw = dados[i].fim.split(' ')[1].split(':')
      var dataFimRodada = new Date(dataFimRodadaRaw[0], (dataFimRodadaRaw[1] - 1), dataFimRodadaRaw[2], horaFimRodadaRaw[0], horaFimRodadaRaw[1], horaFimRodadaRaw[2]) 
      if(dataAtual <= dataFimRodada && dataAtual >= dataInicioRodada){
        return new Promise((resolve, reject) => {
          resolve(dados[i].rodada_id)
        })
      } 
        
      else if(dataAtual < dataInicioRodada){
        return new Promise((resolve, reject) => {
          resolve(dados[i].rodada_id)
          rodadaAnterior = resolve(dados[i].rodada_id-1)
        }).catch(rodadaAnterior)
      }
    }
    
  }

  getRodada(){
    let url = 'https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/rodadas'
    return this.httpGet(url)
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'Carregando...'
    })
    loader.present() //Loader aparece até carregar a lista

    this.getRodada().then(this.getRodadaAtual).then((idRodada) => {
      this.getPartidas(idRodada).then((partidas) => {
        var tmpPartidas = []
        this.todasPartidas = partidas
        for(var partida in this.todasPartidas.partidas){
          var currentPartida = this.todasPartidas.partidas[partida]
          tmpPartidas.push({
            idPartida: currentPartida.partida_id,
            mandante: this.todasPartidas.clubes[currentPartida.clube_casa_id],
            visitante: this.todasPartidas.clubes[currentPartida.clube_visitante_id],
            data: currentPartida.partida_data,
            local: currentPartida.local
          })
        }
        console.log(tmpPartidas)
        this.partidasDaRodada = tmpPartidas
        loader.dismiss() //Mata o loader
      })
    }).catch(err => {
      loader.dismiss()
      this.alertCtrl.create({
        title: 'Falha na conexão',
        buttons: [{text: 'OK'}],
        subTitle: 'Não foi possível obter as partidas. Tente novamente.'
      }).present()
    })
   }

   selectPartida(partida) {
     this.navCtrl.push(EscolhaPage, {partidaEscolhida: partida})
   }

  signOut() {
    this.auth.auth.signOut();
  }
}
 