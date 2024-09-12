import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
const MFE_APP_URL = "http://localhost:4201/remoteEntry.js";

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // { path: 'todo-list', component: TodoComponent }
    { path: 'todo-list',
        loadComponent: () => 
            loadRemoteModule({
              remoteEntry: MFE_APP_URL,
              remoteName: 'project2',
              exposedModule: './ListComponent'   // This matches what you exposed in webpack.config.js
            })
            .then(m => m.ListComponent)  // Adjust this if the component export is different
            .catch(err => console.error('Error loading remote component:', err))
    }
];
