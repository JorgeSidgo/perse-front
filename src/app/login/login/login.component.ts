import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/entity/Login';
import { Account } from 'src/app/entity/Account';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginButtonLoading = false;
  cuenta: Account;
  loginData: any;
  loginForm: FormGroup;
  requirePass = false;

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cuenta = new Account();
    this.loginData = new Login();
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null],
      is_admin: [false]
    });
  }

  ngOnInit(): void { }

  login(): void {
    this.loginButtonLoading = true;
    // tslint:disable-next-line: forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.dirty && this.loginForm.valid) {

      if (!this.loginForm.value.is_admin) {
        this.loginData = {
          email: this.loginForm.value.email
        };
      } else {
        this.loginData = this.loginForm.value;
      }


      this.authService.login(this.loginData).subscribe((data) => {

        if (data === 0) {
          this.requirePass = true;
          this.loginForm.controls.is_admin.setValue(true);
        }

        if (data.code) {
          this.authService.removeToken();
          this.authService.setToken(data);
          if (data.roles[0].name === 'client') {
            this.router.navigateByUrl('/app/home');
          } else {
            this.router.navigateByUrl('/app/clients');
          }

        } else {
          this.loginButtonLoading = false;
        }
      }, (error) => {
        if (error.status === 422) {
          this.messageService.error('Credenciales Incorrectas');
          this.loginButtonLoading = false;
        }
      });

    } else {
      this.loginButtonLoading = false;
    }



  }
}
