import { Component, OnInit } from '@angular/core';
import { AllowFunc, CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { AgendaService } from 'src/app/services/agenda.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ModalCalendarioAgregarComponent } from './modal-calendario-agregar/modal-calendario-agregar.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalCalendarioActualizarComponent } from './modal-calendario-actualizar/modal-calendario-actualizar.component';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as dayjs from 'dayjs';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ModalCampeonatoInscripcionComponent } from './modal-campeonato-inscripcion/modal-campeonato-inscripcion.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  usuario: any = {
    id: 1,
    nombre: 'Jugador 1',
    rol: 'Usuario',
    correo: 'jugador@tennis.cl',
    numero: '1234 5678',
    serie: '00 MUY WENO',
    club: 'SUPERCAMPEONES'
  }

  newEvents: any = [];

  eventos: any = [];

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: false,
    // dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '23:00',
    },
    titleFormat: { dateStyle: 'long' },
    dayHeaderFormat: { weekday: 'long' },
    slotDuration: '01:00:00',
    slotMinTime: '00:00:00',
    slotMaxTime: '01:00:00',
    locale: esLocale,
    timeZone: 'America/Santiago',
    height: 770,
    // selectAllow: ((res: any) => {
    //   if (dayjs(res.start).day() == 5 || ((dayjs(res.start).hour() > 8) && (dayjs(res.end).hour() < 21))) {
    //     return null;
    //   } else if (dayjs(res.start).day() == 6 || ((dayjs(res.start).hour() > 8) && (dayjs(res.end).hour() < 21))) {
    //     return null;
    //   } else {
    //     return res;
    //   }
    // })
  };

  currentEvents: EventApi[] = [];

  constructor(
    private agendaService: AgendaService,
    private calendarioService: CalendarioService,
    private campeonatoService: CampeonatoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getCalendario();
    this.getCampeonatos();
  }

  getCalendario() {
    this.calendarioService.getCalendario()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          for (let i = 0; i < datos.length; i++) {
            this.newEvents.push({
              id_agendamiento: datos[i].id_agendamiento,
              id_usuario: datos[i].id_usuario,
              id_serie: datos[i].id_serie,
              id_club: datos[i].id_club,
              start: datos[i].fecha_agenda_inicio,
              end: datos[i].fecha_agenda_fin,
              title: (this.usuario.id == datos[i].id_usuario ? "Juanito Perez vs Carlos" : "Carlos vs Juanito Perez"),
              display: "block",
              backgroundColor: (this.usuario.id == datos[i].id_usuario ? "#d4770d" : "gray"),
              borderColor: (this.usuario.id == datos[i].id_usuario ? "#d4770d" : "gray"),
            })
          }
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  getCampeonatos() {
    this.campeonatoService.getCampeonato()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          for (let i = 0; i < datos.length; i++) {
            this.newEvents.push({
              id_campeonato: datos[i].id_campeonato,
              id_usuario: datos[i].id_usuario,
              titulo: datos[i].titulo,
              descripcion: datos[i].descripcion,
              start: datos[i].fecha_inicio,
              end: datos[i].fecha_fin,
              title: "Carlos vs Juanito Perez",
              display: "block",
              backgroundColor: "#5e7be6",
              borderColor: "#5e7be6"
            })
          }
          this.calendarOptions.events = this.newEvents;
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    let selected = selectInfo
    console.log(selected)

    let date = dayjs(selectInfo.start).add(1, 'day')
    let dialogRef = this.dialog.open(ModalCalendarioAgregarComponent, {
      height: '650px',
      width: '650px',
      data: {
        fechaInicio: date,
        fechaFin: dayjs(date).add(1, 'hour')
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  handleEventClick(clickInfo: EventClickArg) {


    let id_agenda = clickInfo.event.extendedProps['id_agendamiento']
    let id_campeonato = clickInfo.event.extendedProps['id_campeonato']
    let id_usuario = clickInfo.event.extendedProps['id_usuario']

    let id = 0;
    let componente = null;

    if (id_agenda != null && id_agenda != "") {
      id = id_agenda;
      componente = ModalCalendarioActualizarComponent

    } else if (id_campeonato != null && id_campeonato != "") {
      id = id_campeonato;
      componente = ModalCampeonatoInscripcionComponent
    }

    if (id_usuario == this.usuario.id) {
      let dialogRef = this.dialog.open(componente!, {
        height: '650px',
        width: '650px',
        data: {
          id: id,
        }
      }).afterClosed().subscribe(() => {
        this.ngOnInit();
      })
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  refreshTable() {
    this.getCalendario();
  }

}
