import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from '../../assets/providers/post-provider';

@Component({
  selector: 'app-dados-gerais',
  templateUrl: './dados-gerais.page.html',
  styleUrls: ['./dados-gerais.page.scss'],
})
export class DadosGeraisPage implements OnInit {

  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage,
    private actRoute: ActivatedRoute
  ) { }

  relatorios: any = [];
  pacientes: any = [];
  solicitacaoPesquisa: string = "";
  idPaciente: string = "";
  boolVisualizar: boolean = true;
  visualizarTela: boolean = true;
  requisicao: string = ""; // o que vem da rota
  nome: string = ""; //Nome do paciente
  nomeMae: string = "";  //nome da mãe
  area: string = ""; // a area de atuacao do dono do login
  visualizarConteudo: boolean = true;
  nomeProfissional: string = ""; // nome do carinha q fez login
  comentario: string = ""; // comentario para salvar
  categoria: string = ""; // publico ou privado
  dataAtual: string = "";

  ngOnInit() {

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

  pegarMeusPacientes(){
    this.pacientes = [];
    this.actRoute.params.subscribe((data)=>{
     let dados = {
      requisicao: "categoriaPaciente",
      opcao: data.opcao
     }
     this.requisicao = data.opcao;
     console.log(dados)
     this.provider.requisicaoPost(dados,"/buscarPaciente.php").subscribe((data)=>{
      var IDs = []
      if(this.requisicao == "fisioterapeuta"){
        for(let c of data['resultado2']){
          if(c.fisioterapeuta == "sim"){
            var teste = c.id;
            var teste2 = c.nomeMae;
            var euHein ={
              id: teste,
              mae: teste2
            }
            IDs.push(euHein);
          }
        }
      }
      else if(this.requisicao == "psicologa"){
        for(let c of data['resultado2']){
          if(c.psicologa == "sim"){
            var teste = c.id;
            var teste2 = c.nomeMae;
            var euHein ={
              id: teste,
              mae: teste2
            }
            IDs.push(euHein);
          }
        }
       }
       else if(this.requisicao == "assistenteSocial"){
         for(let c of data['resultado2']){
           if(c.assistenteSocial == "sim"){
            var teste = c.id;
            var teste2 = c.nomeMae;
            var euHein ={
              id: teste,
              mae: teste2
            }
            IDs.push(euHein);
           }
         }
        }
        else if(this.requisicao == "psicopedagogia"){
          for(let c of data['resultado2']){
            if(c.psicopedagogia == "sim"){
              var teste = c.id;
            var teste2 = c.nomeMae;
            var euHein ={
              id: teste,
              mae: teste2
            }
              IDs.push(euHein);
            }
          }
         }
         else if(this.requisicao == "psicopedagogia"){
           for(let c of data['resultado2']){
             if(c.psicopedagogia == "sim"){
              var teste = c.id;
            var teste2 = c.nomeMae;
            var euHein ={
              id: teste,
              mae: teste2
            }
              IDs.push(euHein);
             }
           }
          }
          else if(this.requisicao == "fonoaudiologo"){
            for(let c of data['resultado2']){
              if(c.fonoaudiologo == "sim"){
                var teste = c.id;
                var teste2 = c.nomeMae;
                var euHein ={
                  id: teste,
                  mae: teste2
                }    
                IDs.push(euHein);
              }
            }
           }
           else if(this.requisicao == "pedagogia"){
             for(let c of data['resultado2']){
               if(c.pedagogia == "sim"){
                var teste = c.id;
                var teste2 = c.nomeMae;
                var euHein ={
                  id: teste,
                  mae: teste2
                }    
                IDs.push(euHein);
               }
             }
            }
            else if(this.requisicao == "nutricionista"){
              for(let c of data['resultado2']){
                if(c.nutricionista == "sim"){
                  var teste = c.id;
                  var teste2 = c.nomeMae;
                  var euHein ={
                    id: teste,
                    mae: teste2
                  }      
                  IDs.push(euHein);
                }
              }
            }
            // agora comparo os id com o resultado1 que tem os nomes das pessoas
            for(let c of data['resultado1']){
              this.pacientes = [];
              for(var i=0; i<IDs.length ; i++){
                if(c.id == IDs[i].id){
                  this.pacientes.push(c);
                }
              }
            }
     },(error)=>{
       console.log(error);
       this.presentAlert("Não foi possivel carregar os pacientes");
     })
    })
  }
  voltarVisualizacao(){
    this.visualizarConteudo = true;
  }

  salvarRelatorio(){
    let dados = {
      requisicao: "salvarRelatorio",
      nome: this.nome,
      mae: this.nomeMae,
      comentario: this.comentario,
      nomeProfissional: this.nomeProfissional,
      area: this.area,
      categoria: this.categoria,
      dataRelatorio: this.dataAtual
    }
    console.log(dados)
    this.provider.requisicaoPost(dados,"/relatorios.php").subscribe((data)=>{
      if(data['situacao'] == true){
        this.presentAlert("Salvo com suceso.");
        this.visualizarConteudo = true;
        this.pegarRelatorios();
      }
      else{
        this.presentAlert("Não foi possivel salvar. Tente novamente");
      }
    },(error)=>{
      console.log(error);
    })
  }
  criarRelatorio(){
    this.visualizarConteudo=false;
  }
  verSeSelecionou(){
    for(let c of this.pacientes){
      if(c.id == this.idPaciente){
        this.nomeMae = c.nomeMae;
        this.nome = c.nome;
      }
    }

    this.pegarRelatorios();
    if(this.idPaciente ==""){
      this.boolVisualizar = true;
    }
    else 
      this.boolVisualizar = false;
  }
  ionViewWillEnter(){
    this.nativeStorage.getItem('login').then((data)=>{ // lembrar de colocar a area na area
      this.area = data.usuario.area;
      this.visualizarTela = true;
      this.pegarMeusPacientes();
      this.pegardata();
    },(error)=>{
       this.presentAlert("Por motivos de segurança você foi redirecionado a tela de login.");
       this.route.navigate(["/login"]);
       console.log(error);
     });

  }
  pegardata() {
    var mes = new Array(
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    );

    var hoje = new Date();
    var ontem = new Date(hoje.getTime());

    ///////////////////////////////////
    var diaString = '';
    var mesString = '';
    var horaString = '';
    var minutoString = '';

    var dd = ontem.getDate();
    var mm = ontem.getMonth();
    var hora = ontem.getHours();
    var min = ontem.getMinutes();

    mesString = '' + mm;
    diaString = '' + dd;

    if (dd < 10) {
      diaString = '0' + dd;
    }
    if (hora < 10) {
      horaString = '0' + hora;
    }
    if (min < 10) {
      minutoString = '0' + min;
    }

    this.dataAtual = diaString+" de "+mes[mm]+" de "+hoje.getFullYear() +" ás " + horaString + ":" + minutoString;
    console.log(diaString+" de "+mes[mm]+" de "+hoje.getFullYear() +" ás " + horaString + ":" + minutoString);
  }

  pegarRelatorios(){
    let dados ={
      requisicao: "pegarAllRelatorios",
      nome: this.nome,
      mae: this.nomeMae
    }
    this.pacientes = [];
    this.provider.requisicaoPost(dados,"/relatorios.php").subscribe((data)=>{
      if(data['situacao'] == true){
        for(let c of data['resultado']){
          if(c.categoria  == "publico"){
            this.relatorios.push(c);
          }
          else if(c.categoria == 'privado' && c.area == this.area){
            this.relatorios.push(c);
          }
        }  
      }
      else{
        this.pegarRelatorios();
      }
    },(error)=>{
      console.log(error);
    })
  }

}
