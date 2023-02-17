import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes =[
    {
        path: '',
        component: ListarComponent,
    },
    {
        path: 'crear',
        component: CrearComponent
    },
    {
        path:'editar/:uuid',
        component: EditarComponent
    },
    {
      path:'editar/new',
      component: EditarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class ProductosRoutingModule {}
