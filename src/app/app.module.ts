import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { ContactComponent } from './modules/contact/contact.component';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from './modules/base/base.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgendamientoComponent } from './modules/agendamiento/agendamiento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CalendarioComponent } from './modules/calendario/calendario.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalCalendarioAgregarComponent } from './modules/calendario/modal-calendario-agregar/modal-calendario-agregar.component';
import { ModalCalendarioActualizarComponent } from './modules/calendario/modal-calendario-actualizar/modal-calendario-actualizar.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule } from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CampeonatoComponent } from './modules/campeonato/campeonato.component';
import { ModalRevisarComponent } from './modules/agendamiento/modal-revisar/modal-revisar.component';
import { AgregarCampeonatoComponent } from './modules/campeonato/agregar-campeonato/agregar-campeonato.component';
import { IngresoComponent } from './modules/auth/ingreso/ingreso.component';
import { ModalCampeonatoInscripcionComponent } from './modules/calendario/modal-campeonato-inscripcion/modal-campeonato-inscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BaseComponent,
    AgendamientoComponent,
    CalendarioComponent,
    ModalCalendarioAgregarComponent,
    ModalCalendarioActualizarComponent,
    CampeonatoComponent,
    ModalRevisarComponent,
    AgregarCampeonatoComponent,
    IngresoComponent,
    ModalCampeonatoInscripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
