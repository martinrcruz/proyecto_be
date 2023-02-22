import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { UtilsService } from 'src/app/services/utils.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-modal-calendario-agregar',
  templateUrl: './modal-calendario-agregar.component.html',
  styleUrls: ['./modal-calendario-agregar.component.css']
})
export class ModalCalendarioAgregarComponent implements OnInit {

  saveResponse: any
  newEvents: any

  usuario: any = {
    id: 1,
    nombre: 'Jugador 1',
    rol: 'Usuario',
    correo: 'jugador@tennis.cl',
    numero: '1234 5678',
    serie: '00 MUY WENO',
    club: 'SUPERCAMPEONES'
  }

  variable: any
  options = new FormGroup({
    serie: new FormControl(),
  })

  clubList: any
  serieList: any
  jugadorList: any
  bloquesHorarios: any

  error: any = {
    message: '',
    class: ''
  }

  fechaInicio: any;
  fechaFin: any;
  horaInicio: any;
  horaFin: any;
  bloque_horario_fecha: any

  bloque_horario = [
    // dayjs().format("DD-MM-YYYY 08:00"),
    // dayjs().format("DD-MM-YYYY 09:00"),
    // dayjs().format("DD-MM-YYYY 10:00"),
    // dayjs().format("DD-MM-YYYY 11:00"),
    // dayjs().format("DD-MM-YYYY 12:00"),
    // dayjs().format("DD-MM-YYYY 13:00"),
    // dayjs().format("DD-MM-YYYY 14:00"),
    // dayjs().format("DD-MM-YYYY 15:00"),
    // dayjs().format("DD-MM-YYYY 16:00"),
    // dayjs().format("DD-MM-YYYY 17:00"),
    // dayjs().format("DD-MM-YYYY 18:00"),
    // dayjs().format("DD-MM-YYYY 19:00"),
    // dayjs().format("DD-MM-YYYY 20:00"),
    // dayjs().format("DD-MM-YYYY 21:00"),
    // dayjs().format("DD-MM-YYYY 22:00"),
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
  ]

  disponibilidad_horaria = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
    private _formBuilder: FormBuilder,
    private calendarioService: CalendarioService,
    private utils: UtilsService
  ) { }


  ngOnInit(): void {
    if (this.data) {
      this.fechaInicio = dayjs(this.data.fechaInicio).format('DD-MM-YYYY')
      this.horaInicio = dayjs(this.data.fechaInicio).format('HH:mm A')
      this.horaFin = dayjs(this.data.fechaFin).format('HH:mm A')
    }
    this.getSerie();
    this.getClub();
    this.getJugador();
    this.getBloquesHorarios()
  }

  getClub() {
    this.utils.getClub()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.clubList = datos;
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  getSerie() {
    this.utils.getSerie()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.serieList = datos;
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  getJugador() {
    this.utils.getJugador()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.jugadorList = datos;
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  getBloquesHorarios() {
    this.calendarioService.getCalendario()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          for (let i = 0; i < datos.length; i++) {
            this.bloque_horario_fecha = dayjs(datos[i].fecha_agenda_inicio).format('dd-mm-YYYY HH:mm')
            let bloque_horario_fecha_fmtd = dayjs(datos[i].fecha_agenda_inicio).format('HH:mm')
            for (let i = 0; i < this.bloque_horario.length; i++) {
              if (bloque_horario_fecha_fmtd == this.bloque_horario[i]) {
                this.disponibilidad_horaria[i] = false
              } else {
                this.disponibilidad_horaria[i] = true
              }
            }
          }
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }


  calendarioForm = new FormGroup({
    id_calendario: new FormControl({ value: 'No aplica', disabled: true }),
    id_usuario: new FormControl(),
    id_serie: new FormControl(),
    id_club: new FormControl(),
    bloque_horario: new FormControl(),
    festivo: new FormControl(),
    observacion: new FormControl(),
    id_usuario_1: new FormControl(),
    id_usuario_2: new FormControl()
  })

  addCalendario() {
    let valor = this.fechaInicio + " " + this.calendarioForm.get("bloque_horario")?.value
    // console.log(valor)
    let fecha_inicio = dayjs(valor).format("YYYY-DD-MM HH:mm:ss")
    // console.log(fecha_inicio)
    let fecha_fin = dayjs(valor).add(1, 'hour').format("YYYY-DD-MM HH:mm:ss")
    // console.log(fecha_fin)

    var formData: any = new FormData();
    formData.append("id_usuario", this.usuario.id);
    formData.append("id_serie", this.calendarioForm.get("id_serie")?.value);
    formData.append("id_club", this.calendarioForm.get("id_club")?.value);
    formData.append("fecha_inicio_agenda", fecha_inicio);
    formData.append("fecha_fin_agenda", fecha_fin);
    formData.append("festivo", 0);
    formData.append("observacion", "text");
    formData.append("id_usuario_1", this.calendarioForm.get("id_usuario_1")?.value);
    formData.append("id_usuario_2", this.calendarioForm.get("id_usuario_2")?.value);

    this.calendarioService.addCalendario(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.dialogRef.closeAll()
        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })
  }

}
