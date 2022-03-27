import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarPerfilPage } from './visualizar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarPerfilPageRoutingModule {}
