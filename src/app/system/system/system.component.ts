import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entity/Account';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';
import * as cryptoJs from 'crypto-js';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  title = 'Persé';
  email: string;
  userData: Account;
  isCollapsed = false;

  headerBarText: string;

  permissionLoading = false;
  permitList: any[];

  deviceWidth = false;

  fullMenuVisible = false;

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {
    this.headerBarText = 'Persé';
    this.userData = this.authService.getAccount();
    this.email = this.userData.email;
    this.deviceWidth = (window.innerWidth < 576) ? true : false;
  }


  ngOnInit(): void {
    this.resize();
    this.getPermits();
    this.changeState(this.isCollapsed);
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
    this.backgroundStyle(state);
  }

  getPermits() {

    this.permissionLoading = true;
    const idRol = this.userData.roles[0].id;

    if (localStorage.getItem('Permit') == null) {
      this.permissionService.getPermits(idRol).subscribe(data => {
        this.permitList = data.data;
        const tokenizedPermits = cryptoJs.AES.encrypt(JSON.stringify(this.permitList), environment.secret);
        localStorage.setItem('Permit', tokenizedPermits);
        this.permissionLoading = false;
        console.log(this.permitList);
      });
    } else {
      const decodedPermits = cryptoJs.AES.decrypt(localStorage.getItem('Permit'), environment.secret);
      this.permitList = JSON.parse(decodedPermits.toString(cryptoJs.enc.Utf8));
      this.permissionLoading = false;
    }
  }

  resize(): void {
    window.addEventListener('resize', e => {
      this.deviceWidth = (window.innerWidth < 576) ? true : false;
    });
  }

  backgroundStyle(state: boolean): void {

    const skewd = document.getElementById('skew-background');

    if (!state && !this.deviceWidth) {
      skewd.style.width = 'calc((100% - 200px) - 1.2em)';
    } else if (state && !this.deviceWidth) {
      skewd.style.width = 'calc(100% - 1.2em)';
    } else if (!state && this.deviceWidth) {
      skewd.style.width = 'calc(100% - 200px)';
    } else if (state && this.deviceWidth) {
      skewd.style.width = 'calc(100%)';
    }
    console.log(skewd.style.width);
  }

  closeFullMenu(): void {
    this.fullMenuVisible = false;
  }

  logout() {
    this.authService.logout();
  }

}
