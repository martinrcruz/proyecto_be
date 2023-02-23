import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-revisar',
  templateUrl: './modal-revisar.component.html',
  styleUrls: ['./modal-revisar.component.css']
})
export class ModalRevisarComponent implements OnInit {

  clubList: any
  serieList: any
  jugadorList: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
