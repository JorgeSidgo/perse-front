import { Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {  UsersService } from 'src/app/services/users.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { TypeProductService } from 'src/app/services/type-product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/entity/Product';
import { TypeProduct } from 'src/app/entity/TypeProduct';
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-redemptions',
  templateUrl: './redemptions.component.html',
  styleUrls: ['./redemptions.component.css']
})
export class RedemptionsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private typeProductService: TypeProductService,
    private categorieService: CategorieService,
    private userService: UsersService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  isLoading:boolean=true;

  productList:Product[];
  typeProductList:TypeProduct[];
  clientList:Client[];

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.clientList = null;
    this.userService.getClients().subscribe((data) => {
      this.clientList = data.data;
      this.isLoading = false;
    });
  }

}
