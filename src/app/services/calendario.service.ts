import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private apiUrl: string = environment.apiUrl;
  private calendarioUrl: string = 'calendario';

  constructor(
    private http: HttpClient
  ) { }

  getCalendario(){
    return this.http.get(`${this.apiUrl}${this.calendarioUrl}/getCalendario`);
  }

  getCalendarioById(formData: any){
    return this.http.post(`${this.apiUrl}${this.calendarioUrl}/getCalendarioById`, formData);
  }

  addCalendario(calendarioData: any) {
    return this.http.post(`${this.apiUrl}${this.calendarioUrl}/addCalendario`, calendarioData);
  }

  updateCalendario(calendarioData: any) {
    return this.http.post(`${this.apiUrl}${this.calendarioUrl}/updateCalendario`, calendarioData);
  }

  deleteCalendario(id_calendario: any) {
    return this.http.post(`${this.apiUrl}${this.calendarioUrl}/deleteCalendario`, id_calendario);
  }
}
