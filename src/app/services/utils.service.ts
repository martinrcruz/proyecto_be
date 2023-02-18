import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl: string = environment.apiUrl;
  private serieUrl: string = 'serie';
  private clubUrl: string = 'club';
  private jugadorUrl: string = 'jugador';

  constructor(
    private http: HttpClient
  ) { }


  //SERIE

  getSerie() {
    return this.http.get(`${this.apiUrl}${this.serieUrl}/getSerie`);
  }

  addSerie(serieData: any) {
    return this.http.post(`${this.apiUrl}${this.serieUrl}/addSerie`, serieData);
  }

  updateSerie(serieData: any) {
    return this.http.post(`${this.apiUrl}${this.serieUrl}/updateSerie`, serieData);
  }

  deleteSerie(id_serie: any) {
    return this.http.post(`${this.apiUrl}${this.serieUrl}/deleteSerie`, id_serie);
  }


  //CLUB

  getClub() {
    return this.http.get(`${this.apiUrl}${this.clubUrl}/getClub`);
  }

  addClub(clubData: any) {
    return this.http.post(`${this.apiUrl}${this.clubUrl}/addClub`, clubData);
  }

  updateClub(clubData: any) {
    return this.http.post(`${this.apiUrl}${this.clubUrl}/updateClub`, clubData);
  }

  deleteClub(id_club: any) {
    return this.http.post(`${this.apiUrl}${this.clubUrl}/deleteClub`, id_club);
  }

  //JUGADORES
  getJugador() {
    return this.http.get(`${this.apiUrl}${this.jugadorUrl}/getJugador`);
  }

  addJugador(jugadorData: any) {
    return this.http.post(`${this.apiUrl}${this.jugadorUrl}/addJugador`, jugadorData);
  }

  updateJugador(jugadorData: any) {
    return this.http.post(`${this.apiUrl}${this.jugadorUrl}/updateJugador`, jugadorData);
  }

  deleteJugador(id_jugador: any) {
    return this.http.post(`${this.apiUrl}${this.jugadorUrl}/deleteJugador`, id_jugador);
  }
}
