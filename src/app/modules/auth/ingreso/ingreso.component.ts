import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    identity: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  login() {
    var formData: any = new FormData();
    formData.append("identity", this.loginForm.get("identity")?.value);
    formData.append("password", this.loginForm.get("password")?.value);

    this.authService.login(formData)

  }

}
