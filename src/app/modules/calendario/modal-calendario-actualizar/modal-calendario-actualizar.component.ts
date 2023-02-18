import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modal-calendario-actualizar',
  templateUrl: './modal-calendario-actualizar.component.html',
  styleUrls: ['./modal-calendario-actualizar.component.css']
})
export class ModalCalendarioActualizarComponent implements OnInit {

  clubList: any
  serieList: any
  jugadorList: any

  editData: any
  saveResponse: any

  usuario: any = {
    id: 1,
    nombre: 'Jugador 1',
    rol: 'Usuario',
    correo: 'jugador@tennis.cl',
    numero: '1234 5678',
    serie: '00 MUY WENO',
    club: 'SUPERCAMPEONES'
  }

  fechaInicio: any;
  fechaFin: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
    private _formBuilder: FormBuilder,
    private calendarioService: CalendarioService,
    private utils: UtilsService
  ) { }
  id_agenda: any
  ngOnInit(): void {
    if (this.data) {
      this.id_agenda = this.data.id
      this.loadData(this.id_agenda)
      this.getClub()
      this.getSerie()
      this.getJugador()
    }
  }


  calendarioForm = new FormGroup({
    id_calendario: new FormControl(),
    id_usuario: new FormControl(),
    id_serie: new FormControl(),
    id_club: new FormControl(),
    fecha_inicio_agenda: new FormControl(),
    fecha_fin_agenda: new FormControl(),
    festivo: new FormControl(),
    observacion: new FormControl(),
    id_usuario_1: new FormControl(),
    id_usuario_2: new FormControl()
  })

  loadData(id_agenda: any) {
    console.log(id_agenda)
    var formData: any = new FormData();
    formData.append("id_agendamiento", id_agenda);

    this.calendarioService.getCalendarioById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData)
          this.calendarioForm.setValue({
            id_calendario: this.editData.data[0].id_agendamiento,
            id_usuario: 1,
            id_serie: this.editData.data[0].id_serie,
            id_club: this.editData.data[0].id_club,
            fecha_inicio_agenda: this.editData.data[0].fecha_agenda_inicio,
            fecha_fin_agenda: this.editData.data[0].fecha_agenda_fin,
            festivo: this.editData.data[0].festivo,
            observacion: this.editData.data[0].observacion,
            id_usuario_1: this.editData.data[0].id_usuario_1,
            id_usuario_2: this.editData.data[0].id_usuario_2,
          })
          this.fechaInicio = dayjs(this.editData.data[0].fecha_agenda_inicio).format("DD/MM/YYYY HH:mm:ss A")
          this.fechaFin = dayjs(this.editData.data[0].fecha_agenda_fin).format("DD/MM/YYYY HH:mm:ss A")
        },
        error: (err) => {
          alert('error')
        }
      })
  }


  updateCalendario() {

    let fecha_inicio = dayjs(this.calendarioForm.get("fecha_inicio_agenda")?.value).format("YYYY-MM-DD HH:mm:ss")
    let fecha_fin = dayjs(this.calendarioForm.get("fecha_fin_agenda")?.value).format("YYYY-MM-DD HH:mm:ss")

    console.log(fecha_inicio)
    console.log(fecha_fin)
    var formData: any = new FormData();
    formData.append("id_calendario", this.calendarioForm.get("id_calendario")?.value);
    formData.append("id_usuario", this.usuario.id);
    formData.append("id_serie", this.calendarioForm.get("id_serie")?.value);
    formData.append("id_club", this.calendarioForm.get("id_club")?.value);
    formData.append("fecha_agenda_inicio", fecha_inicio);
    formData.append("fecha_agenda_fin", fecha_fin);
    formData.append("festivo", 0);
    formData.append("observacion", this.calendarioForm.get("observacion")?.value);
    formData.append("id_usuario_1", this.calendarioForm.get("id_usuario_1")?.value);
    formData.append("id_usuario_2", this.calendarioForm.get("id_usuario_2")?.value);


    this.calendarioService.updateCalendario(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          // this.refreshTable.emit();
        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })
  }

  eliminarCalendario() {
    var formData: any = new FormData();
    formData.append("id_agendamiento", this.calendarioForm.get("id_calendario")?.value);
    this.calendarioService.deleteCalendario(formData)
      .subscribe({
        next: (res) => {
          alert('borrado con exito')
        },
        error: (err) => {
          alert('error al eliminar')

        }
      })
  }





  clearForm() {
    this.calendarioForm.setValue({
      id_calendario: '',
      id_usuario: '',
      id_serie: '',
      id_club: '',
      fecha_inicio_agenda: '',
      fecha_fin_agenda: '',
      festivo: '',
      observacion: '',
      id_usuario_1: '',
      id_usuario_2: '',
      // id_usuario_cargo: '',
    })
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

}
