import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AlertController, LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { PostProvider } from '../../assets/providers/post-provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
declare var viewDados1: any;
declare var viewDados2: any;
declare var viewDados3: any;

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.page.html',
  styleUrls: ['./editar-paciente.page.scss'],
})
export class EditarPacientePage implements OnInit {

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

  @ViewChild('fileInput') fileInputClick: ElementRef;
  desativarSalvar: boolean = false;
  id: string = "";

  relatorio1: string = "";
  relatorio1Excluir: boolean = true;
  relatorio2: string = "";
  relatorio2Excluir: boolean = true;
  relatorio3: string = "";
  relatorio3Excluir: boolean = true;
  relatorio4: string = "";
  relatorio4Excluir: boolean = true;
  relatorio5: string = "";
  relatorio5Excluir: boolean = true;
  relatorio6: string = "";
  relatorio6Excluir: boolean = true;
  relatorio7: string = "";
  relatorio7Excluir: boolean = true;
  relatorio8: string = "";
  relatorio8Excluir: boolean = true;
  relatorio9: string = "";
  relatorio9Excluir: boolean = true;
  relatorio10: string = "";
  relatorio10Excluir: boolean = true;
  relatorio11: string = "";
  relatorio11Excluir: boolean = true;
  relatorio12: string = "";
  relatorio12Excluir: boolean = true;
  relatorio13: string = "";
  relatorio13Excluir: boolean = true;
  relatorio14: string = "";
  relatorio14Excluir: boolean = true;
  relatorio15: string = "";
  relatorio15Excluir: boolean = true;
  relatorio16: string = "";
  relatorio16Excluir: boolean = true;
  relatorio17: string = "";
  relatorio17Excluir: boolean = true;
  relatorio18: string = "";
  relatorio18Excluir: boolean = true;
  relatorio19: string = "";
  relatorio19Excluir: boolean = true;
  relatorio20: string = "";
  relatorio20Excluir: boolean = true;


  excluirRelatorio(opcao){
    if(opcao == "r1"){ this.relatorio1 = ""; this.relatorio1Excluir = true; } else if(opcao == "r2"){ this.relatorio2 = ""; this.relatorio2Excluir = true; } else if(opcao == "r3"){ this.relatorio3 = ""; this.relatorio3Excluir = true; } else if(opcao == "r4"){ this.relatorio4 = ""; this.relatorio4Excluir = true; } else if(opcao == "r5"){ this.relatorio5 = ""; this.relatorio5Excluir = true; } else if(opcao == "r6"){ this.relatorio6 = ""; this.relatorio6Excluir = true; } else if(opcao == "r7"){ this.relatorio7 = ""; this.relatorio7Excluir = true; } else if(opcao == "r8"){ this.relatorio8 = ""; this.relatorio8Excluir = true; } else if(opcao == "r9"){ this.relatorio9 = ""; this.relatorio9Excluir = true; } else if(opcao == "r10"){ this.relatorio10 = ""; this.relatorio10Excluir = true; } else if(opcao == "r11"){ this.relatorio11 = ""; this.relatorio11Excluir = true; } else if(opcao == "r12"){ this.relatorio12 = ""; this.relatorio12Excluir = true; } else if(opcao == "r13"){ this.relatorio13 = ""; this.relatorio13Excluir = true; } else if(opcao == "r14"){ this.relatorio14 = ""; this.relatorio14Excluir = true; } else if(opcao == "r15"){ this.relatorio15 = ""; this.relatorio15Excluir = true; } else if(opcao == "r16"){ this.relatorio16 = ""; this.relatorio16Excluir = true; } else if(opcao == "r17"){ this.relatorio17 = ""; this.relatorio17Excluir = true; } else if(opcao == "r18"){ this.relatorio18 = ""; this.relatorio18Excluir = true; } else if(opcao == "r19"){ this.relatorio19 = ""; this.relatorio19Excluir = true; } else if(opcao == "r20"){ this.relatorio20 = ""; this.relatorio20Excluir = true; }
  }






  cartaoSUS: string = "../../assets/imagens_adcionais/sem-imagem.png";
  cartaoSUSExcluir: boolean = true;
  comprovanteResidencia: string = "../../assets/imagens_adcionais/sem-imagem.png";
  comprovanteResidenciaExcluir: boolean = true;
  rgExcluir: boolean = true;
  rg: string = "../../assets/imagens_adcionais/sem-imagem.png";

  visualizarTela: boolean = false;

  qtdRelatorios: number = 0;
  fotoCrianca: string = "../../assets/imagens_adcionais/avatar.png";
  extensaoImagem: string = "";


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
    private iab: InAppBrowser,
    private provider: PostProvider,
    private loadingController: LoadingController,
    private route: Router,
    private actRoute: ActivatedRoute,
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
  excluirRG(){
    this.rg = "../../assets/imagens_adcionais/sem-imagem.png";
    this.rgExcluir = true;
  }

  excluirComprovanteResidencial(){
    this.comprovanteResidencia = "../../assets/imagens_adcionais/sem-imagem.png";
    this.comprovanteResidenciaExcluir = true;
  }
  
  excluirCartao(){
    this.cartaoSUS = "../../assets/imagens_adcionais/sem-imagem.png";
    this.cartaoSUSExcluir = false;
  }
  ionViewWillEnter() {
    this.nativeStorage.getItem('login').then((data)=>{
    this.visualizarTela = true;
    this.actRoute.params.subscribe((data)=>{
      this.id = data.id;
      this.carregamentoPrimario(data.id);
      this.carregamentoSecundario(data.id);
    },(error)=>{
      console.log(error)
    })
   },(error)=>{
     this.presentAlert("Por motivos de segurança você foi redirecionado a tela de login.");
     this.route.navigate(["/login"]);
     console.log(error);
   });
  }

  adcionarAdmissao(){
    var ponto =".";
    if(this.dataAdmissao.length ==2)  this.dataAdmissao = this.dataAdmissao + ponto;
      else if(this.dataAdmissao.length ==5) this.dataAdmissao = this.dataAdmissao + ponto;
  }


  salvarSecundario(){
    this.presentLoading("Salvando imagens/pdf's");
    var nutricionista;
    var pedagogia;
    var fonoaudiologo;
    var psicopedagogia;
    var assistenteSocial;
    var psicologa;
    var fisioterapeuta;
    console.log("O id é :"+this.id)
    // Nessa linha está toda a verificacao se foi marcado os checkbox ou não
    if(this.form2[2].isChecked == true) nutricionista = "sim"; else nutricionista = "nao"; if(this.form2[1].isChecked == true)pedagogia ="sim"; else pedagogia = "nao"; if(this.form2[0].isChecked == true)fonoaudiologo ="sim"; else fonoaudiologo ="nao"; if(this.form[3].isChecked == true) psicopedagogia ="sim"; else psicopedagogia ="nao"; if(this.form[2].isChecked == true) assistenteSocial ="sim"; else assistenteSocial ="nao"; if(this.form[1].isChecked == true)psicologa ="sim"; else psicologa ="nao"; if(this.form[0].isChecked == true) fisioterapeuta ="sim"; else fisioterapeuta ="nao";

    let dados = {
      requisicao: "alterarSecundario",
      id: this.id,
      interacaoComDemais: this.interacaoComDemais,
      queixaPais: this.queixaPais,
      queixaCriancas: this.queixaCriancas,
      fotoCrianca: this.fotoCrianca,
      rg: this.rg,
      comprovanteResidencia: this.comprovanteResidencia,
      dataAdmissao: this.dataAdmissao,
      dadosCartaoSUS: this.dadosCartaoSUS,
      dadosCPF: this.dadosCPF,
      dadosRG: this.dadosRG,
      cartaoSUS: this.cartaoSUS,
      relatorio1: this.relatorio1,
      relatorio2: this.relatorio2,
      relatorio3: this.relatorio3,
      relatorio4: this.relatorio4,
      relatorio5: this.relatorio5,
      relatorio6: this.relatorio6,
      relatorio7: this.relatorio7,
      relatorio8: this.relatorio8,
      relatorio9: this.relatorio9,
      relatorio10: this.relatorio10,
      relatorio11: this.relatorio11,
      relatorio12: this.relatorio12,
      relatorio13: this.relatorio13,
      relatorio14: this.relatorio14,
      relatorio15: this.relatorio15,
      relatorio16: this.relatorio16,
      relatorio17: this.relatorio17,
      relatorio18: this.relatorio18,
      relatorio19: this.relatorio19,
      relatorio20: this.relatorio20,
      nutricionista: nutricionista,
      pedagogia: pedagogia,
      fonoaudiologo: fonoaudiologo,
      psicopedagogia: psicopedagogia,
      assistenteSocial: assistenteSocial,
      psicologa: psicologa,
      fisioterapeuta: fisioterapeuta,
    }
    this.provider.requisicaoPost(dados,"/alterarPaciente.php").subscribe((data)=>{
      console.log(data);
      if(data['situacao'] == 200){
        this.loadingController.dismiss();
        this.presentAlert("Paciente alterado com sucesso");
        this.route.navigate(["/dashboard"]);
      }else{
        this.presentAlert("Não foi possivel salvar os dados do paciente.");
      }
    })
  }
  salvarPrimario(){
    this.desativarSalvar = true;
    this.presentLoading("Salvando ...");
    let dados ={
      requisicao: "alterarPrimario",
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      dataNascimento: this.dataNascimento,
      naturalidade: this.naturalidade,
      endereco: this.endereco,
      nomePai: this.nomePai,
      profissaoPai: this.profissaoPai,
      nomeMae: this.nomeMae,
      profissaoMae: this.profissaoMae,
      sexo: this.sexo,
      cor: this.cor,
      escolaridadePai: this.escolaridadePai,
      escolaridadeMae: this.escolaridadeMae,
      responsavel: this.responsavel,
      nomeEntrevistado: this.nomeEntrevistado,
      telefone: this.telefone,
      email: this.email,
      duracaoGravidez: this.duracaoGravidez,
      doencas: this.doencas,
      ocorrenciasGestacao: this.ocorrenciasGestacao,
      medicacoes: this.medicacoes,
      alergia: this.alergia,
      sono: this.sono,
      acompanhamentoFora: this.acompanhamentoFora,
      escola: this.escola,
      amigosEscola: this.amigosEscola,
      personalidadeCrianca: this.personalidadeCrianca,
      habilidadeEscrita: this.habilidadeEscrita,
      dificuldadeLeitura: this.dificuldadeLeitura,
      gostaEstudar: this.gostaEstudar,
      rotinaCrianca: this.rotinaCrianca,
      gostaFazerEmCasa: this.gostaFazerEmCasa,
      comoCriancaBrinca: this.comoCriancaBrinca,
      interageComOsPais: this.interageComOsPais,
    }
    this.provider.requisicaoPost(dados,"/alterarPaciente.php").subscribe((data)=>{
      console.log(data);
      if(data['situacao'] == 200){
        this.loadingController.dismiss();
          this.salvarSecundario();
      }else{
        this.presentAlert("Não foi possivel salvar os dados do paciente.");
      }
    })
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
    },(error)=>{
      console.log(error)
    })
  }
  async removerFoto(){
    const alert = await this.alertController.create({
      cssClass: 'primary',
      message: 'Tem certeza que deseja remover a foto do perfil do paciente ?',
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
          text: 'Apagar',
          id: 'confirm-button',
          handler: () => {
            this.fotoCrianca = "../../assets/imagens_adcionais/avatar.png";
          }
        }
      ]
    });

    await alert.present();
  }
  carregamentoSecundario(id){
    let dados ={
      requisicao: "carregarPaciente2",
      id: id
    }
    this.provider.requisicaoPost(dados,"/buscarPaciente.php").subscribe((data)=>{
      console.log(data)
      for(let c of data['resultado']){
        this.interacaoComDemais = c.interacaoComDemais;
        this.queixaPais = c.queixaPais;
        this.queixaCriancas = c.queixaCriancas;
        this.fotoCrianca = c.fotoCrianca;
        this.dataAdmissao= c.dataAdmissao;
        this.dadosCartaoSUS= c.dadosCartaoSUS;
        this.dadosCPF= c.dadosCPF;
        this.dadosRG= c.dadosRG;

        if(this.rg !=""){
          this.rg = c.rg;
          this.rgExcluir = false;
        }
        if(this.comprovanteResidencia !=""){
          this.comprovanteResidencia = c.comprovanteResidencia;
          this.comprovanteResidenciaExcluir = false;
        }
        
        if(this.cartaoSUS !=""){
          this.cartaoSUS = c.cartaoSUS;
          this.cartaoSUSExcluir = false;
        }

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

        if(c.relatorio1 != "") {
          this.relatorio1 = c.relatorio1;
          this.relatorio1Excluir = false;
          this.qtdRelatorios = 1;
        }
        if(c.relatorio2 != "") {
          this.relatorio2 = c.relatorio2;
          this.relatorio2Excluir = false;
          this.qtdRelatorios = 2;
        }
        if(c.relatorio3 != "") {
          this.relatorio3 = c.relatorio3;
          this.relatorio3Excluir = false;
          this.qtdRelatorios = 3;
        }
        if(c.relatorio4 != "") {
          this.relatorio4 = c.relatorio4;
          this.relatorio4Excluir = false;
          this.qtdRelatorios = 4;
        }
        if(c.relatorio5 != "") {
          this.relatorio5 = c.relatorio5;
          this.relatorio5Excluir = false;
          this.qtdRelatorios = 5;
        }
        if(c.relatorio6 != "") {
          this.relatorio6 = c.relatorio6;
          this.relatorio6Excluir = false;
          this.qtdRelatorios = 6;
        }
        if(c.relatorio7 != "") {
          this.relatorio7 = c.relatorio7;
          this.relatorio7Excluir = false;
          this.qtdRelatorios = 7;
        }
        if(c.relatorio8 != "") {
          this.relatorio8 = c.relatorio8;
          this.relatorio8Excluir = false;
          this.qtdRelatorios = 8;
        }
        if(c.relatorio9 != "") {
          this.relatorio9 = c.relatorio9;
          this.relatorio9Excluir = false;
          this.qtdRelatorios = 9;
        }
        if(c.relatorio10 != "") {
          this.relatorio10 = c.relatorio10;
          this.relatorio10Excluir = false;
          this.qtdRelatorios = 10;
        }
        if(c.relatorio11 != "") {
          this.relatorio11 = c.relatorio11;
          this.relatorio11Excluir = false;
          this.qtdRelatorios = 11;
        }
        if(c.relatorio12 != "") {
          this.relatorio12 = c.relatorio12;
          this.relatorio12Excluir = false;
          this.qtdRelatorios = 12;
        }
        if(c.relatorio13 != "") {
          this.relatorio13 = c.relatorio13;
          this.relatorio13Excluir = false;
          this.qtdRelatorios = 13;
        }
        if(c.relatorio14 != "") {
          this.relatorio14 = c.relatorio14;
          this.relatorio14Excluir = false;
          this.qtdRelatorios = 14;
        }
        if(c.relatorio15 != "") {
          this.relatorio15 = c.relatorio15;
          this.relatorio15Excluir = false;
          this.qtdRelatorios = 15;
        }
        if(c.relatorio16 != "") {
          this.relatorio16 = c.relatorio16;
          this.relatorio16Excluir = false;
          this.qtdRelatorios = 16;
        }
        if(c.relatorio17 != "") {
          this.relatorio17 = c.relatorio17;
          this.relatorio17Excluir = false;
          this.qtdRelatorios = 17;
        }
        if(c.relatorio18 != "") {
          this.relatorio18 = c.relatorio18;
          this.relatorio18Excluir = false;
          this.qtdRelatorios = 18;
        }
        if(c.relatorio19 != "") {
          this.relatorio19 = c.relatorio19;
          this.relatorio19Excluir = false;
          this.qtdRelatorios = 19;
        }
        if(c.relatorio20 != "") {
          this.relatorio20 = c.relatorio20;
          this.relatorio20Excluir = false;
          this.qtdRelatorios = 20;
        }
        break;
      }
    },(error)=>{
      console.log(error);
      this.presentAlert("Não foi possivel recuperar todas as informaões.<br>Tente novamente");
    })
  }
  async presentLoading(mensagem) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensagem,
    });
    await loading.present();


    console.log('Loading dismissed!');
  }
  adcionarData(){
    var ponto =".";
    if(this.dataNascimento.length ==2)  this.dataNascimento = this.dataNascimento + ponto;
      else if(this.dataNascimento.length ==5) this.dataNascimento = this.dataNascimento + ponto;
  }

  onFileChange(event, opcao) {
    console.log(event.target.files)
    var filename = event.target.files[0].name
    console.log("File Name")
    console.log(filename)
    var fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0])
    fileReader.onload = () => {
      if(opcao == "pdf1"){
        this.relatorio1 = this.arrayBuffertoString(fileReader.result);
        this.relatorio1Excluir = false;
      }
      else if(opcao == "pdf2"){
        this.relatorio2 = this.arrayBuffertoString(fileReader.result);
        this.relatorio2Excluir = false;
      }
      else if(opcao == 'pdf3'){
        this.relatorio3 = this.arrayBuffertoString(fileReader.result);
        this.relatorio3Excluir = false;
      }
      else if(opcao == 'pdf4'){
        this.relatorio4 = this.arrayBuffertoString(fileReader.result);
        this.relatorio4Excluir = false;
      }
      else if(opcao == 'pdf5'){
        this.relatorio5 = this.arrayBuffertoString(fileReader.result);
        this.relatorio5Excluir = false;
      }
      else if(opcao == 'pdf6'){
        this.relatorio6 = this.arrayBuffertoString(fileReader.result);
        this.relatorio6Excluir = false;
      }
      else if(opcao == 'pdf7'){
        this.relatorio7 = this.arrayBuffertoString(fileReader.result);
        this.relatorio7Excluir = false;
      }
      else if(opcao == 'pdf8'){
        this.relatorio8 = this.arrayBuffertoString(fileReader.result);
        this.relatorio8Excluir = false;
      }
      else if(opcao == 'pdf9'){
        this.relatorio9 = this.arrayBuffertoString(fileReader.result);
        this.relatorio9Excluir = false;
      }
      else if(opcao == 'pdf10'){
        this.relatorio10 = this.arrayBuffertoString(fileReader.result);
        this.relatorio10Excluir = false;
      }
      else if(opcao == 'pdf11'){
        this.relatorio11 = this.arrayBuffertoString(fileReader.result);
        this.relatorio11Excluir = false;
      }
      else if(opcao == 'pdf12'){
        this.relatorio12 = this.arrayBuffertoString(fileReader.result);
        this.relatorio12Excluir = false;
      }
      else if(opcao == 'pdf13'){
        this.relatorio13 = this.arrayBuffertoString(fileReader.result);
        this.relatorio13Excluir = false;
      }
      else if(opcao == 'pdf14'){
        this.relatorio14 = this.arrayBuffertoString(fileReader.result);
        this.relatorio14Excluir = false;
      }
      else if(opcao == 'pdf15'){
        this.relatorio15 = this.arrayBuffertoString(fileReader.result);
        this.relatorio15Excluir = false;
      }
      else if(opcao == 'pdf16'){
        this.relatorio16 = this.arrayBuffertoString(fileReader.result);
        this.relatorio16Excluir = false;
      }
      else if(opcao == 'pdf17'){
        this.relatorio17 = this.arrayBuffertoString(fileReader.result);
        this.relatorio17Excluir = false;
      }
      else if(opcao == 'pdf18'){
        this.relatorio18 = this.arrayBuffertoString(fileReader.result);
        this.relatorio18Excluir = false;
      }
      else if(opcao == 'pdf19'){
        this.relatorio19 = this.arrayBuffertoString(fileReader.result);
        this.relatorio19Excluir = false;
      }
      else if(opcao == 'pdf20'){
        this.relatorio20 = this.arrayBuffertoString(fileReader.result);
        this.relatorio20Excluir = false;
      }
    }
  }

  arrayBuffertoString(array){
    const pdfConvertido = array;
    return pdfConvertido;
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

  uploadImagem(fileInput: any, opcao: string) {
    var imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.presentAlert(
          'O tamanho máximo permitido é ' + max_size / 1000 + 'Mb'
        );
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.presentAlert('Apenas imagens são permitidas ( JPG | PNG )');
        return false;
      }
      this.extensaoImagem = fileInput.target.files[0].type.substr(6, 8);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            this.presentAlert(
              'Dimensões máximas permitidas ' +
                max_height +
                '*' +
                max_width +
                'px'
            );
            return false;
          } else {
            const imgBase64Path = e.target.result;

            if(opcao == "fotoCrianca"){
              this.fotoCrianca = imgBase64Path;
            }
            else if(opcao == "RG"){
              this.rg = imgBase64Path;
              this.rgExcluir = false;
            }
            else if(opcao == "Comprovante de residencia"){
              this.comprovanteResidencia = imgBase64Path;
              this.comprovanteResidenciaExcluir = false;
            }            
            else if(opcao == "Cartão do SUS"){
              this.cartaoSUS = imgBase64Path;
              this.cartaoSUSExcluir = false;
            }
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}