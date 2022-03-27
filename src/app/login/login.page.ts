import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/assets/providers/post-provider';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  login: string = "";
  senha: string = "";
  tentativas: number = 0;
  secreto: string = "password";
  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage
  ) { }


  sobreSenha() {
    if (this.secreto == "password") {
      this.secreto = "text";
    }
    else {
      this.secreto = "password";
    }
  }


  fazerLogin() {
    if (this.login == "") {
      this.presentAlert("Informe o login.");
      return false;
    }
    else if (this.senha == "") {
      this.presentAlert("Informe sua senha.");
      return false;
    }
    else {
      let dados = {
        requisicao: "validarLogin",
        login: this.login,
        senha: this.senha
      }
      this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
        console.log(data)
        var login, senha, area, id;
        if(data['status'] == "200"){
          for(let c of data['resultado']){
            login = c.login;
            senha = c.senha;
            area = c.area;
            id = c.id;
          }
          let informeLogin = {
            login: login,
            senha: senha,
            area: area,
            id: id
          }
          
          this.nativeStorage.setItem("login", { usuario: informeLogin }).then((data) => {
            this.route.navigate(["/dashboard"]);
            },
            (error) => {
              this.presentAlert("Não foi possivel efetuar o login, tente novamente ou entre em contato.");
              console.error('Error storing item', error)
          });
        }
        else if(data['status'] == "404"){
          this.presentAlert("Login e/ou senha incorreta");
        }
        else  this.presentAlert("Não foi possivel efetuar o login, tente novamente.");
      });
   }
  }



  ngOnInit() {
  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
