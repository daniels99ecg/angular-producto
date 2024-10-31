import { RouterModule, Routes } from '@angular/router';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { AddEditItemsComponent } from './components/add-edit-items/add-edit-items.component';

export const routes: Routes = [
    { path: '', component: ListItemsComponent },  // Ruta predeterminada
    { path: 'add', component: AddEditItemsComponent },  // Ruta para añadir/editar
    { path: 'edit/:id', component: AddEditItemsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirecciona cualquier ruta inválida
  ];
  



