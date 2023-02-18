import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent implements OnInit {
  

  displayedColumns: string[] = ['nombre', 'club', 'serie', 'dia', 'fecha', 'observacion', 'editar'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: any;


  animalControl = new FormControl();
  selectFormControl = new FormControl('', Validators.required);
  agendamientos: any[] = [];
  clubes: any[] = [];

  agenda = [
    {
      nombre: 'Juan Perez',
      club: 'Club 01',
      serie: '00 Profesional',
      dia: 'Lunes',
      fecha: '13/02/2023',
      observacion: ''
    },
    {
      nombre: 'Juan Perez',
      club: 'Club 01',
      serie: '00 Profesional',
      dia: 'Martes',
      fecha: '14/02/2023',
      observacion: ''
    },
    {
      nombre: 'Juan Perez',
      club: 'Club 01',
      serie: '00 Profesional',
      dia: 'Viernes',
      fecha: '17/02/2023',
      observacion: ''
    }
  ]


  constructor(
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.getServicio();
    this.dataSource.paginator = this.paginator;
  }

  getServicio() {
    this.dataSource = new MatTableDataSource(this.agenda);

  }


}
