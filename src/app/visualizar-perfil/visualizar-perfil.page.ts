import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from '../../assets/providers/post-provider';
import html2canvas from 'html2canvas';
declare var viewDados1: any;
declare var viewDados2: any;
declare var viewDados3: any;

@Component({
  selector: 'app-visualizar-perfil',
  templateUrl: './visualizar-perfil.page.html',
  styleUrls: ['./visualizar-perfil.page.scss'],
})
export class VisualizarPerfilPage implements OnInit {

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;


  nome: string = "";
  idade: string = "";
  dataNascimento: string = "";
  naturalidade: string = "";
  endereco: string = "";
  nomePai: string = "";
  profissaoPai: string = "";
  nomeMae: string = "";
  profissaoMae: string = "";
  sexo: string = "";
  cor: string = "";
  escolaridadePai: string = "";
  escolaridadeMae: string = "";
  responsavel: string = "";
  nomeEntrevistado: string = "";
  telefone: string = "";
  email: string = "";
  duracaoGravidez: string = "";
  doencas: string = "";
  ocorrenciasGestacao: string = "";
  medicacoes: string = "";
  alergia: string = "";
  sono: string = "";
  acompanhamentoFora: string = "";
  escola: string = "";
  amigosEscola: string = "";
  personalidadeCrianca: string = "";
  habilidadeEscrita: string = "";
  dificuldadeLeitura: string = "";
  gostaEstudar: string = "";
  rotinaCrianca: string = "";
  gostaFazerEmCasa: string = "";
  comoCriancaBrinca: string = "";
  interageComOsPais: string = "";
  interacaoComDemais: string = "";
  queixaPais: string = "";
  queixaCriancas: string = "";

  dataAdmissao: string = "";
  dadosCartaoSUS: string = "";
  dadosCPF: string = "";
  dadosRG: string = "";
  

  relatorio1: string = "";
  relatorio2: string = "";
  relatorio3: string = "";
  relatorio4: string = "";
  relatorio5: string = "";
  relatorio6: string = "";
  relatorio7: string = "";
  relatorio8: string = "";
  relatorio9: string = "";
  relatorio10: string = "";
  relatorio11: string = "";
  relatorio12: string = "";
  relatorio13: string = "";
  relatorio14: string = "";
  relatorio15: string = "";
  relatorio16: string = "";
  relatorio17: string = "";
  relatorio18: string = "";
  relatorio19: string = "";
  relatorio20: string = "";
  cartaoSUS: string = "../../assets/imagens_adcionais/sem-imagem.png";
  comprovanteResidencia: string = "../../assets/imagens_adcionais/sem-imagem.png";
  rg: string = "../../assets/imagens_adcionais/sem-imagem.png";
  fotoCrianca: string = "../../assets/imagens_adcionais/avatar.png";
  visualizarTela: boolean = false;


  public form = [
    { nome: 'Fisioterapeuta', isChecked: false },
    { nome: 'Psicóloga', isChecked: false },
    { nome: 'Assistente social', isChecked: false },
    { nome: 'Psicopedagogia', isChecked: false }
  ];
  public form2 = [
    { nome: 'Fonoaudiólogo', isChecked: false },
    { nome: 'Pedagogia', isChecked: false },
    { nome: 'Nutricionista', isChecked: false }
  ];

  constructor(
    private alertController: AlertController,
    private provider: PostProvider,
    private loadingController: LoadingController,
    private route: Router,
    private adcRoute: ActivatedRoute,
    private nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
    try{
      viewDados1().funcao();
      viewDados2().funcao();
      viewDados3().funcao();
    }catch{
      console.log("View de browser não renderizado");
    }
  }
  async presentAlert(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: error,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  
  async alertaClicavel() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 6000000,
      message: `Estamos carregando o arquivo.
      <br>Após todo o processo, clique em qualquer parte da página para continuar.`,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
    this.downloadImage();
    const { role, data } = await loading.onDidDismiss();
  }


  downloadImage(){
    console.log("entrou !");
    /*npm i --save html2canvas*/
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      var popup = window.open();
      popup.document.write ('<img src =' + canvas.toDataURL() + '>');
      popup.document.close ();
      popup.focus ();
      setTimeout(function (){
        popup.print();
        popup.close();

      }, 1000);
    });
      /*
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = this.nomeAluno+'.png';
      this.downloadLink.nativeElement.click();
    });*/
  }
  
  ionViewWillEnter() {
    this.nativeStorage.getItem('login').then((data)=>{
      this.visualizarTela = true;
      this.adcRoute.params.subscribe((data)=>{
        this.carregamentoPrimario(data.id);
        this.carregamentoSecundario(data.id);
      },(error)=>{
        console.log(error);
      })
     },(error)=>{
       this.presentAlert("Por motivos de segurança você foi redirecionado a tela de login.");
       this.route.navigate(["/login"]);
       console.log(error);
     });
  }
  
  carregamentoPrimario(id){
    let dados ={
      requisicao: "carregarPaciente",
      id: id
    }
    this.provider.requisicaoPost(dados,"/buscarPaciente.php").subscribe((data)=>{
      for(let c of data['resultado']){
        this.nome = c.nome;
        this.idade = c.idade;
        this.dataNascimento = c.dataNascimento;
        this.naturalidade = c.naturalidade;
        this.endereco = c.endereco;
        this.nomePai = c.nomePai;
        this.profissaoPai = c.profissaoPai;
        this.nomeMae = c.nomeMae;
        this.profissaoMae = c.profissaoMae;
        this.sexo = c.sexo;
        this.cor = c.cor;
        this.escolaridadePai = c.escolaridadePai;
        this.escolaridadeMae = c.escolaridadeMae;
        this.responsavel = c.responsavel;
        this.nomeEntrevistado = c.nomeEntrevistado;
        this.telefone = c.telefone;
        this.email = c.email;
        this.duracaoGravidez = c.duracaoGravidez;
        this.doencas = c.doencas;
        this.ocorrenciasGestacao = c.ocorrenciasGestacao;
        this.medicacoes = c.medicacoes;
        this.alergia = c.alergia;
        this.sono = c.sono;
        this.acompanhamentoFora = c.acompanhamentoFora;
        this.escola = c.escola;
        this.amigosEscola = c.amigosEscola;
        this.personalidadeCrianca = c.personalidadeCrianca;
        this.habilidadeEscrita = c.habilidadeEscrita;
        this.dificuldadeLeitura = c.dificuldadeLeitura;
        this.gostaEstudar = c.gostaEstudar;
        this.rotinaCrianca = c.rotinaCrianca;
        this.gostaFazerEmCasa = c.gostaFazerEmCasa;
        this.comoCriancaBrinca = c.comoCriancaBrinca;
        this.interageComOsPais = c.interageComOsPais;
        break;
      }
    })
  }

  carregamentoSecundario(id){
    let dados ={
      requisicao: "carregarPaciente2",
      id: id
    }
    this.provider.requisicaoPost(dados,"/buscarPaciente.php").subscribe((data)=>{
      for(let c of data['resultado']){
        this.interacaoComDemais = c.interacaoComDemais;
        this.queixaPais = c.queixaPais;
        this.queixaCriancas = c.queixaCriancas;
        this.fotoCrianca = c.fotoCrianca;
        this.rg = c.rg;
        this.comprovanteResidencia = c.comprovanteResidencia;
        this.cartaoSUS = c.cartaoSUS;
        this.dataAdmissao= c.dataAdmissao;
        this.dadosCartaoSUS= c.dadosCartaoSUS;
        this.dadosCPF= c.dadosCPF;
        this.dadosRG= c.dadosRG;

        if(c.fisioterapeuta == "sim")this.form[0].isChecked = true;
        else this.form[0].isChecked = false;

        if(c.psicologa == "sim") this.form[1].isChecked = true;
        else this.form[1].isChecked = false;

        if(c.assistenteSocial == "sim") this.form[2].isChecked = true;
        else this.form[2].isChecked = false;
        
        if(c.psicopedagogia == "sim") this.form[3].isChecked = true;
        else this.form[3].isChecked = false;

        if(c.fonoaudiologo == "sim") this.form2[0].isChecked = true;
        else this.form2[0].isChecked = false;
        
        if(c.pedagogia == "sim") this.form2[1].isChecked = true;
        else this.form2[1].isChecked = false;
        
        if(c.nutricionista == "sim") this.form2[2].isChecked = true;
        else this.form2[2].isChecked = false;

        console.log(this.form, this.form2)
        this.relatorio1 = c.relatorio1;
        this.relatorio2 = c.relatorio2;
        this.relatorio3 = c.relatorio3;
        this.relatorio4 = c.relatorio4;
        this.relatorio5 = c.relatorio5;
        this.relatorio6 = c.relatorio6;
        this.relatorio7 = c.relatorio7;
        this.relatorio8 = c.relatorio8;
        this.relatorio9 = c.relatorio9;
        this.relatorio10 = c.relatorio10;
        this.relatorio11 = c.relatorio11;
        this.relatorio12 = c.relatorio12;
        this.relatorio13 = c.relatorio13;
        this.relatorio14 = c.relatorio14;
        this.relatorio15 = c.relatorio15;
        this.relatorio16 = c.relatorio16;
        this.relatorio17 = c.relatorio17;
        this.relatorio18 = c.relatorio18;
        this.relatorio19 = c.relatorio19;
        this.relatorio20 = c.relatorio20;
        break;
      }
    },(error)=>{
      console.log(error);
      this.presentAlert("Não foi possivel recuperar todas as informaões.<br>Tente novamente");
    })
  }

  verPDF(pdf){ 
    if(this.relatorio1.length == 0){
      this.presentAlert("Nenhum PDF encontrado");
    }else{
      let pdfWindow = window.open("")
      pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='" +
          encodeURI(pdf) + "'></iframe>"
      )
    }
  }

}
