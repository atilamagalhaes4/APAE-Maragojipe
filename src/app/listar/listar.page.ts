import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from '../../assets/providers/post-provider';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage
  ) { }

  pacientes: any = [];
  solicitacaoPesquisa: string = "";
  visualizarTela: boolean = false;
  ngOnInit() {

  }

  irProcurar(){
    this.pacientes = [];
    let dados = {
      requisicao: "buscarPaciente",
      nome: this.solicitacaoPesquisa
    }
    this.provider.requisicaoPost(dados,"/buscarPaciente.php").subscribe((data)=>{
      this.pacientes = [];
     for(let c of data['resultado']){
       this.pacientes.push(c);
     }
    },(error)=>{
      console.log(error);
    })
  }
  
  async removerPaciente(id, nome) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Tem certeza que deseja remover '+nome+' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Deletar mesmo assim',
          id: 'confirm-button',
          handler: () => {
            let dados ={
              requisicao: "deletarPaciente",
              id: id
            }
            this.provider.requisicaoPost(dados,"/excluirPacientes.php").subscribe((data)=>{
              console.log(data);
              if(data['mensagem'] == "Apagamos os 2 query de uma vez."){
                this.irProcurar();
                this.presentAlert("Apagado com sucesso")
              }
              else this.presentAlert("Não foi possivel deletar.<br>Tente novamente");
            },(error)=>{
              console.log(error);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mensagem,
      buttons: ['Entendi']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  ionViewWillEnter(){

    this.nativeStorage.getItem('login').then((data)=>{
      this.visualizarTela = true;
     },(error)=>{
       this.presentAlert("Por motivos de segurança você foi redirecionado a tela de login.");
       this.route.navigate(["/login"]);
       console.log(error);
     });
  }
}
