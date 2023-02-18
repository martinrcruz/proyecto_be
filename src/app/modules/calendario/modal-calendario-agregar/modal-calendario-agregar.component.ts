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

  usuario: any = {
    id: 0,
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

  error: any = {
    message: '',
    class: ''
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


  ngOnInit(): void {
    if (this.data) {
      this.fechaInicio = dayjs(this.data.fechaInicio).format('DD-MM-YYYY HH:mm:ss A')
      this.fechaFin = dayjs(this.data.fechaFin).format('DD-MM-YYYY HH:mm:ss A')
    }
    this.getSerie();
    this.getClub();
    this.getJugador();
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


  calendarioForm = new FormGroup({
    id_calendario: new FormControl({ value: 'No aplica', disabled: true }),
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

  addCalendario() {
    var formData: any = new FormData();
    formData.append("id_usuario", this.usuario.id);
    formData.append("id_serie", this.calendarioForm.get("id_serie")?.value);
    formData.append("id_club", this.calendarioForm.get("id_club")?.value);
    formData.append("fecha_inicio_agenda", dayjs(this.data.fechaInicio).format("YYYY-MM-DD HH:mm:ss"));
    formData.append("fecha_fin_agenda", dayjs(this.data.fechaFin).format("YYYY-MM-DD HH:mm:ss"));
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
