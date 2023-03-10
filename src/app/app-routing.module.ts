import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamientoComponent } from './modules/agendamiento/agendamiento.component';
import { IngresoComponent } from './modules/auth/ingreso/ingreso.component';
import { BaseComponent } from './modules/base/base.component';
import { CalendarioComponent } from './modules/calendario/calendario.component';
import { CampeonatoComponent } from './modules/campeonato/campeonato.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        data: {
            title: 'Home'
        },
        children: [{
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path: 'ingreso',
            component: IngresoComponent,
        },
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'agendamiento',
            component: AgendamientoComponent
        },
        {
            path: 'calendario',
            component: CalendarioComponent
        },
        {
            path: 'campeonato',
            component: CampeonatoComponent
        },
        {
            path: 'contact',
            component: ContactComponent
        }
        ],
    },];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
