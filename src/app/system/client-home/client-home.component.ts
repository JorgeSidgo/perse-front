import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entity/Product';
import { ProductService } from 'src/app/services/product.service';
import { TypeProductService } from 'src/app/services/type-product.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { NzMessageService } from 'ng-zorro-antd';
import { UsersService } from 'src/app/services/users.service';
import { Client } from 'src/app/entity/Client';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/entity/Account';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {


  // DATA
  gridIsLoading = true;
  dataList: Product[];
  typeProductList: any[];
  categorieList: any[];
  percentPoints: number;

  userData: Client;
  userPoints = 0;
  userName = ' ';
  userId = 0;

  account: Account;

  // ENTITIES


  constructor(
    private productService: ProductService,
    private userService: UsersService,
    private authService: AuthService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.index();
  }

  index(): void {
    this.account = this.authService.getAccount();
    this.getClientData(this.account.id_user);
  }

  getClientData(id: number) {
    this.gridIsLoading = true;
    this.userService.getUser(id).subscribe(data => {
      console.log(data.data);
      this.userPoints = data.data.points;
      this.percentPoints = (100 * this.userPoints) / 300;
      this.userName = `${data.data.first_name} ${data.data.last_name}`;
      this.userId = data.data.id;
      this.getAvailable(this.userPoints);
    });
  }


  getAvailable(points: number): void {
    console.log('puntos', points);
    this.dataList = null;
    this.gridIsLoading = true;
    this.productService.index().subscribe((data) => {
      console.log('ava', data.data);
      this.dataList = data.data.data;
      this.gridIsLoading = false;
    });
  }
}
