import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-recycle-products',
  templateUrl: './recycle-products.component.html',
  styleUrls: ['./recycle-products.component.css']
})
export class RecycleProductsComponent implements OnInit {

  isLoading = false;
  dataList = new Array();

  constructor(
    private productService: ProductService,
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDeletes();
  }

  getDeletes(): any {
    this.isLoading = true;
    this.productService.showDeletes().subscribe(data => {
      this.dataList = data.data;
      this.isLoading = false;
    });
  }

  showModalRestore(id: number): any {
    this.modalService.create({
      nzTitle: 'Restaurar Elemento',
      nzContent: '¿Desea restaurar este producto?',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => this.restoreDeleted(id, resolve))
    });
  }


  restoreDeleted(id: number, resolve: any): any {
    this.productService.restoreDeleted(id).subscribe(data => {
      if (data.code) {
        this.messageService.success('Elemento Restaurado');
        this.getDeletes();
        resolve(data.code);
      } else {
        this.messageService.error(data.message);
        resolve(data);
      }
    });
  }

}
