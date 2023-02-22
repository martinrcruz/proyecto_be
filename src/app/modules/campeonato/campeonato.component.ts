import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/services/agenda.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalRevisarComponent } from '../agendamiento/modal-revisar/modal-revisar.component';
import { AgregarCampeonatoComponent } from './agregar-campeonato/agregar-campeonato.component';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {


  displayedColumns: string[] = ['titulo', 'descripcion', 'id_usuario', 'fecha_inicio', 'fecha_fin', 'editar'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: any;


  animalControl = new FormControl();
  selectFormControl = new FormControl('', Validators.required);
  agendamientos: any[] = [];
  clubes: any[] = [];
  clubList: any
  serieList: any



  constructor(
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private agendaService: AgendaService,
    private campeonatoService: CampeonatoService,
    private utils: UtilsService
  ) {
    this.getAgendamientos()
  }

  ngOnInit(): void {
    this.getServicio();
    this.dataSource.paginator = this.paginator;
    this.getClub();
    this.getSerie();
  }

  getServicio() {
    // this.dataSource = new MatTableDataSource(this.agenda);

  }
  getAgendamientos() {
    this.campeonatoService.getCampeonato()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          console.log(datos)
          this.dataSource = datos;

        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  revisarAgenda(id_agenda: any) {
    this.dialog.open(ModalRevisarComponent, {
      height: '650px',
      width: '650px',
      data: {
        id_agenda: id_agenda,

      }
    }).afterClosed().subscribe(() => {
      this.getAgendamientos();
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

  crearCampeonato() {
    this.dialog.open(AgregarCampeonatoComponent, {
      height: '650px',
      width: '650px'
    }).afterClosed().subscribe(() => {
      this.getAgendamientos();
    })
  }
}
