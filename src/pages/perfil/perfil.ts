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
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    private af: AngularFireDatabase,
    private camera: Camera) {
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

  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.dadosUsuario.foto = base64Image;
     }, (err) => {
      // Handle error
     });
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
    })
  }

  editarPerfil() {
    var dadosUpdate = this.dadosUsuario
    var uidTmp = this.dadosUsuario.uid
    delete dadosUpdate.uid
    this.af.object('usuarios/' + uidTmp).update(dadosUpdate).then(_ => console.log('update!'));
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
