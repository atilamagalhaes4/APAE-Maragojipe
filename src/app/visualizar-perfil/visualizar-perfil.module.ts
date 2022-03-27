import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarPerfilPageRoutingModule } from './visualizar-perfil-routing.module';

import { VisualizarPerfilPage } from './visualizar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarPerfilPageRoutingModule
  ],
  declarations: [VisualizarPerfilPage]
})
export class VisualizarPerfilPageModule {}
