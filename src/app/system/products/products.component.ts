import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entity/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  addModalIsVisible = false;
  addModalIsLoading = false;

  gridIsLoading = true;
  dataList: Product[];


  constructor(
    private productService: ProductService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.index();
  }
  showModal(): void {
    this.addModalIsVisible = true;
  }

  index(): void {
    this.productService.index().subscribe((data) => {
      this.dataList = data.data.data;
      this.gridIsLoading = false;
      console.log(this.dataList);
    });
  }

  handleOk(): void {
    this.addModalIsLoading = true;
    setTimeout(() => {
      this.addModalIsVisible = false;
      this.addModalIsLoading = false;
      this.message.success('Producto agregado exitosamente');
    }, 3000);
  }

  handleCancel(): void {
    this.addModalIsVisible = false;
  }
}
