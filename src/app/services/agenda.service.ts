import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrl: string = environment.apiUrl;
  private calendarioUrl: string = 'calendario';

  constructor(
    private http: HttpClient
  ) { }

  getAgendamientos(){
    return this.http.get(`${this.apiUrl}${this.calendarioUrl}/getCalendario`);
  }
}
