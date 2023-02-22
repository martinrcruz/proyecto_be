import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private apiUrl: string = environment.apiUrl;
  private campeonatoUrl: string = 'campeonato';

  constructor(
    private http: HttpClient
  ) { }

  getCampeonato(){
    return this.http.get(`${this.apiUrl}${this.campeonatoUrl}/getCampeonato`);
  }

  getCampeonatoById(formData: any){
    return this.http.post(`${this.apiUrl}${this.campeonatoUrl}/getCampeonatoById`, formData);
  }

  addCampeonato(campeonatoData: any) {
    return this.http.post(`${this.apiUrl}${this.campeonatoUrl}/addCampeonato`, campeonatoData);
  }

  updateCampeonato(campeonatoData: any) {
    return this.http.post(`${this.apiUrl}${this.campeonatoUrl}/updateCampeonato`, campeonatoData);
  }

  deleteCampeonato(id_campeonato: any) {
    return this.http.post(`${this.apiUrl}${this.campeonatoUrl}/deleteCampeonato`, id_campeonato);
  }
}
