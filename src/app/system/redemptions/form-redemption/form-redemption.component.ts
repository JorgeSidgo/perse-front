import { Component, OnInit, Input } from '@angular/core';
import { TypeProduct } from 'src/app/entity/TypeProduct';
import { Client } from 'src/app/entity/Client';
import { UsersService } from 'src/app/services/users.service';
import { Product } from 'src/app/entity/Product';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import { RedemptionService } from 'src/app/services/redemption.service';

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
    private redemptionService: RedemptionService,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalService: NzModalService
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
  sellerId: number;

  clientName: string;
  productName: string;

  redemptionForm: FormGroup;

  ngOnInit() {
    this.initForm();
    this.sellerId = this.authService.getAccountId();
  }


  initForm(): void {
    this.redemptionForm = this.fb.group({
      tipo_canje: [null, [Validators.required]],
      id_seller: [null, [Validators.required]],
      id_cliente: [null, [Validators.required]],
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

    this.type_selected = this.redemptionForm.value.tipo_canje;

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
    let userObj = this.redemptionForm.value.id_cliente;
    this.clientName = this.redemptionForm.value.id_cliente.name;
    this.clienteId = this.redemptionForm.value.id_cliente.id;

    this.getProductosNoImg(userObj.points);

  }

  productoChange(): void {
    this.productName = this.redemptionForm.value.id_producto.name;
    this.productoId = this.redemptionForm.value.id_producto.id;
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

  redemptionStore(): any {

    return new Promise((resolve, reject) => {
      const body = {
        id_user_client: this.clienteId,
        id_user_seller: this.sellerId,
        id_product: this.productoId,
        id_type: this.type_selected,
        state: true
      };

      console.log(body);

      this.redemptionService.redemptionStore(body).subscribe(data => {

        if (data.code) {
          this.messageService.success(data.message);
        } else {
          this.messageService.error(data.message);
        }

        resolve(data);
      });
    }).catch((rej) => rej('error'));

  }

  checkoutModal() {
    console.log(this.redemptionForm.value)
    this.modalService.info({
      nzTitle: 'Confirmación',
      nzContent: `Cliente: ${this.clientName} <br> Producto: ${this.productName}`,
      nzOnOk: () => this.redemptionStore()
    });
  }

}
