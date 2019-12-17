import { Component, OnInit, Input } from '@angular/core';
import { TypeProduct } from 'src/app/entity/TypeProduct';
import { Client } from 'src/app/entity/Client';
import { UsersService } from 'src/app/services/users.service';
import { Product } from 'src/app/entity/Product';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-form-redemption',
  templateUrl: './form-redemption.component.html',
  styleUrls: ['./form-redemption.component.css']
})
export class FormRedemptionComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private productService: ProductService,
    private messageService: NzMessageService,
    private fb: FormBuilder
  ) { }

  type_selected: number;
  optionList: Client[];
  selectedUser: string;
  displayTips = true;
  isLoading = false;

  productList: Product[];
  typeProductList: TypeProduct[];
  clientList: Client[];

  clienteDisabled = true;
  productoDisabled = true;

  clienteId: number;
  productoId: number;

  redemptionForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }


  initForm(): void {
    this.redemptionForm = this.fb.group({
      tipo_canje: [null, [Validators.required]],
      id_usuario: [null, [Validators.required]],
      id_producto: [null, [Validators.required]]
    });
  }

  onSearch(value: string): void {
    if (value && value.length > 1) {
      this.displayTips = false;
    } else {
      this.optionList = [];
      this.displayTips = true;
    }
  }


  tipoCanjeChanged(): void {

    // tslint:disable-next-line: triple-equals
    if (this.redemptionForm.value.tipo_canje == 1) {
      console.log('gift');
      this.getClientesNoGift();
      // tslint:disable-next-line: triple-equals
    } else if (this.redemptionForm.value.tipo_canje == 2) {
      console.log('no-gift');
      this.getClientes();
    }

  }

  clienteChange(): void {
    let userObj = this.redemptionForm.value.id_usuario;

    this.getProductosNoImg(userObj.points);

  }

  productoChange(): void {

  }


  getClientes(): void {
    this.isLoading = true;
    this.clientList = null;
    this.productoDisabled = true;
    this.productList = null;
    this.userService.getClients().subscribe((data) => {
      this.clientList = data.data;
      this.clienteDisabled = false;
      this.isLoading = false;
    });
  }

  getClientesNoGift(): void {
    this.isLoading = true;
    this.clientList = null;
    this.userService.getClientsNoGift().subscribe((data) => {
      this.clientList = data.data;
      this.clienteDisabled = false;
      this.isLoading = false;
    });
  }

  getProductosNoImg(points: number): void {
    this.isLoading = true;
    this.productList = null;
    this.productService.availableNoImg(points).subscribe((data) => {
      this.productList = data.data;
      this.productoDisabled = false;
      this.isLoading = false;
    });
  }

}
