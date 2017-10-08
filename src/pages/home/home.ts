import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
partidasDaRodada: []
clubes: Object

constructor(
  public navCtrl: NavController,
  public http: Http,
  private auth: AngularFireAuth) { }

  httpGet(url) {
    return new Promise((resolve, reject) => {
      this.http.get(url)
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
    let url = 'https://api.cartolafc.globo.com/partidas/' + rodada
    return this.httpGet(url)
  }

  getRodadaAtual(dados){
    let dataAtual = new Date()
    
    for(var i = 0; i < dados.length; i++){
      var dataInicioRodadaRaw = dados[i].inicio.split(' ')[0].split('-')
      var dataInicioRodada = new Date(dataInicioRodadaRaw[0], (dataInicioRodadaRaw[1] - 1), dataInicioRodadaRaw[2]) 

      var dataFimRodadaRaw = dados[i].fim.split(' ')[0].split('-')
      var dataFimRodada = new Date(dataFimRodadaRaw[0], (dataFimRodadaRaw[1] - 1), dataFimRodadaRaw[2]) 

      if(dataAtual <= dataFimRodada && dataAtual >= dataInicioRodada){
        return new Promise((resolve, reject) => {
          resolve(dados[i].rodada_id)
        })
      } 
        
      else if(dataAtual < dataInicioRodada){
        return new Promise((resolve, reject) => {
          resolve(dados[i].rodada_id)
        })
      }
    }
    
  }

  getRodada(){
    let url = 'https://api.cartolafc.globo.com/rodadas'
    return this.httpGet(url)
  }

  ngOnInit() {
    this.getRodada().then(this.getRodadaAtual).then((idRodada) => {
      this.getPartidas(idRodada).then((partidas) => {
        var tmpPartidas = []
        for(var partida in partidas.partidas){
          var currentPartida = partidas.partidas[partida]
          tmpPartidas.push({
            idPartida: currentPartida.partida_id,
            mandante: partidas.clubes[currentPartida.clube_casa_id],
            visitante: partidas.clubes[currentPartida.clube_visitante_id],
            data: currentPartida.partida_data,
            local: currentPartida.local
          })
        }
        console.log(tmpPartidas)
        this.partidasDaRodada = tmpPartidas
      })
    })
  }

  signOut() {
    this.auth.auth.signOut();
  }
}
 