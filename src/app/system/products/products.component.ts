import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  addModalIsVisible = false;
  addModalIsLoading = false;


  constructor(
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }
  showModal(): void {
    this.addModalIsVisible = true;
  }

  handleOk(): void {
    this.addModalIsLoading = true;
    setTimeout(() => {
      this.addModalIsVisible = false;
      this.addModalIsLoading = false;
      this.message.success("Producto agregado exitosamente")
    }, 3000);
  }

  handleCancel(): void {
    this.addModalIsVisible = false;
  }
}
