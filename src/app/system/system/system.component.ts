import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entity/Account';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';
import { slideInAnimation } from 'src/app/animations/animations';
import * as cryptoJs from 'crypto-js';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  animations: [
    slideInAnimation
  ]
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

  notClient = true;

  collapsedWith = 0;

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {
    this.headerBarText = 'Persé';
    this.userData = this.authService.getAccount();
    this.email = this.userData.email;
    this.deviceWidth = (window.innerWidth < 576) ? true : false;
    this.collapsedWith = (this.deviceWidth) ? 0 : 80;
  }


  ngOnInit(): void {
    this.resize();
    this.getPermits();
    this.checkRole();
    this.changeState(this.isCollapsed);
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
    this.backgroundStyle(state);
  }

  checkRole(): void {
    this.notClient = (this.userData.roles[0].name === 'client') ? false : true;
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
      this.headerBarText = (this.deviceWidth) ? 'P' : 'Persé';
    });
  }

  backgroundStyle(state: boolean): void {

    const skewd = document.getElementById('skew-background');

    if (!this.notClient) {
      skewd.style.width = 'calc(100%)';
    } else {
      if (!state && !this.deviceWidth) {
        skewd.style.width = 'calc((100% - 200px) - 1.2em)';
      } else if (state && !this.deviceWidth) {
        skewd.style.width = 'calc(100% - 1.2em)';
      } else if (!state && this.deviceWidth) {
        skewd.style.width = 'calc(100% - 200px)';
      } else if (state && this.deviceWidth) {
        skewd.style.width = 'calc(100%)';
      }
    }


  }

  closeFullMenu(): void {
    this.fullMenuVisible = false;
  }

  logout() {
    this.authService.logout();
  }



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
