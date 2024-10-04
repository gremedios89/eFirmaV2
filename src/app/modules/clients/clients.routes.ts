import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';

export default [
    {
        path     : '',
        component: ClientListComponent,
    },
    {
        path     : 'add-client',
        component: AddClientComponent,
    },

] as Routes;