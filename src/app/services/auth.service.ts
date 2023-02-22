import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'auth';

  isLoggedIn() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/get_user_data`, { withCredentials: true });
  }

  login(data: any) {
    this.http.post(`${this.apiUrl}${this.controllerUrl}/login`, data, { withCredentials: true })
      .subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/'])

        },
        error: (err) => {
          console.log(err)
          this.router.navigate(['auth/login'])

        }
      })
  }

  forgot(data: any){
    this.http.post(`${this.apiUrl}${this.controllerUrl}/forgot_password`, data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err)
          this.router.navigate(['auth/login'])

        }
      })
  }

  logout() {
    this.http.get(`${this.apiUrl}${this.controllerUrl}/logout`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('auth/login')

        },
        error: (err) => {
          console.log(err)

        }
      })
  }
}
