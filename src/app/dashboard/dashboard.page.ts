import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from '../../assets/providers/post-provider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  id: string = "5";
  login: string = "pedagogia";
  senha: string = "abc123";
  area: string = "coordenador";
  visualizarTela: boolean = false;
  constructor(
    private route: Router,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private provider: PostProvider
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.nativeStorage.getItem('login').then((data)=>{
    this.visualizarTela = true;
    this.id = data.usuario.id;
    this.login = data.usuario.login;
    this.senha = data.usuario.senha;
    this.area = data.usuario.area;
    
   },(error)=>{
     this.presentAlert("Por motivos de segurança você foi redirecionado a tela de login.");
     this.route.navigate(["/login"]);
     console.log(error);
   });
  }
  
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mensagem,
      buttons: ['Ok']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  verPacientes(opcao){
    console.log(opcao, this.area)
    if(this.area == "coordenador"){
      this.route.navigate(["/dados-gerais/"+opcao]);
    }
    else if(opcao == this.area){
      this.route.navigate(["/dados-gerais/"+opcao]);
    }
    else{
      this.presentAlert("Você não tem permissão para ver estes dados.");
    }
  }

  sair(){
    this.nativeStorage.clear().then((data)=>{
      this.presentAlert("Volte sempre, "+this.login).then((data)=>{
        this.route.navigate(["/login"]);
      })
    },(error)=>{
      this.presentAlert("Não foi possivel sair.<br>Tente novamente");
    })
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Para trocar de senha, insira as seguintes informações:',
      inputs: [
        {
          name: 'name1',
          type: 'password',
          placeholder: 'Senha Atual',
          cssClass: 'specialClass',
        },
        {
          name: 'name2',
          type: 'password',
          placeholder: 'Nova senha',
          cssClass: 'specialClass',
        },
        {
          name: 'name3',
          type: 'password',
          placeholder: 'Repetir a nova senha',
          cssClass: 'specialClass',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (req) => {
            if(req.name1 == ""){
              this.presentAlert("Informe a senha atual.");
            }
            else if(req.name2== ""){
              this.presentAlert("Informe a nova senha no primeiro campo.")
            }
            else if(req.name3== ""){
              this.presentAlert("Repita a nova senha no segundo campo.")
            }
            else  if(req.name2 !=req.name3){
              this.presentAlert("As senhas não coincidem")
            }
            else{ // enviara os dados
              let dados = {
                requisicao: "validarLogin",
                login: this.login,
                senha: req.name1
              }              
              this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
                if(data['status'] == "200"){
                  let dados2 = {
                    requisicao: "alterarSenha",
                    id: this.id,
                    senha: req.name2
                  }
                  console.log(dados2)
                  this.provider.requisicaoPost(dados2,"/contas.php").subscribe((data)=>{
                    if(data['situacao'] =="200") this.presentAlert("Senha alterada com sucesso.<br>Será requisitada no proximo login.");
                    else this.presentAlert("Não foi possivel alterar a senha.<br>Tente novamente");
                  },(error)=>{
                    console.log(error);
                  });

                }
                else if(data['status'] == "404") this.presentAlert("A senha informada está incorreta");
                else  this.presentAlert("Não foi possivel mudar sua senha, tente novamente.");
              },(error)=>{
                console.log(error);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
