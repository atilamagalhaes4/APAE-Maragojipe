//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {
//  server: string = "http://localhost/api";
  server: string = "https://apae.maragojipe.ba.gov.br/assets/api";
  constructor(
    private http: HttpClient
  ) { }

  acessarBanco(dados: any, api: string) {
    return new Promise((resolve, reject) => {
      let url = this.server + api;
      this.http.post(url, dados)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            //          reject(error.json);
          });
    });
  }

  requisicaoPost(dados: any, api: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httpOptions)
      .map(res => res);
  }


  previsaoTempo() {
    //https://api.hgbrasil.com/weather?woeid=457537
    let url = "https://api.hgbrasil.com/weather?key=650532b3&city_name=Maragogipe,Ba";
    //'application/json'
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'content-type':  "application/json; charset=UTF-8"
      }),
      withCredentials: true
    };

    return this.http.get(url, httpOptions).map(res => res);
  }


}