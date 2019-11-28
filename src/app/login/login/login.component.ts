import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/entity/Login';
import { Account } from 'src/app/entity/Account';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginButtonLoading = false;
  cuenta: Account;
  loginData: Login;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cuenta = new Account();
    this.loginData = new Login();
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
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

    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe((data) => {
      this.loginButtonLoading = false;

      if (data.code) {
        this.authService.removeToken();
        this.authService.setToken(data);
        this.router.navigateByUrl('/app');
      }

    });

  }



}
