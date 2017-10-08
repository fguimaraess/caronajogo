import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'escolha.html'
})

export class EscolhaPage {
    
    public partida;

    constructor(public navParams: NavParams) {
        this.partida = this.navParams.get('partidaEscolhida')
        console.log(this.partida)
    }
}