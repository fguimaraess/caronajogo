import {
  Component
} from '@angular/core';
import {
  NavParams,
  NavController,
  AlertController
} from 'ionic-angular';
import {
  HomePage
} from '../home/home';
import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  AngularFireDatabase
} from 'angularfire2/database';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  public type = "password";
  public showPass = false;
  public usuarioLogado
  public listUsuariosRef
  public listUsuarios
  public dadosUsuario = {
    nome: '',
    email: this.usuarioLogado,
    password: '',
    uid: '',
    foto: ''
  }

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private auth: AngularFireAuth,
    private af: AngularFireDatabase) {
    this.listUsuariosRef = af.object('usuarios')
    this.listUsuarios = this.listUsuariosRef.valueChanges()
    this.verificaUsuario()
    this.getUsuario()
  }
  verificaUsuario() {
    this.auth.auth.onAuthStateChanged(user => {
      this.usuarioLogado = user.email;
    })
  }

  getUsuario() {
    this.listUsuarios.subscribe(usuarios => {
      for (var key in usuarios) {
        if (this.usuarioLogado == usuarios[key].email) {
          this.dadosUsuario.email = usuarios[key].email,
            this.dadosUsuario.password = usuarios[key].password,
            this.dadosUsuario.uid = key
        }
      }
      console.log(this.dadosUsuario)
    })
  }

  editarPerfil() {
    console.log(this.dadosUsuario)
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
}
