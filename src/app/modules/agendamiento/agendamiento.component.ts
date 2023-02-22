import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalRevisarComponent } from './modal-revisar/modal-revisar.component';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'club', 'serie', 'fecha_inicio', 'fecha_fin', 'observacion', 'editar'];
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
    this.agendaService.getAgendamientos()
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

}
