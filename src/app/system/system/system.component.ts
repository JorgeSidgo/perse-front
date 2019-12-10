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

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {
    this.headerBarText = 'Persé';
    this.userData = this.authService.getAccount();
    this.email = this.userData.email;
  }


  ngOnInit(): void {
    this.getPermits();
  }

  changeState(state: boolean): any {
    this.headerBarText = (!state) ? 'Persé' : 'P';
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

  logout() {
    this.authService.logout();
  }

}
