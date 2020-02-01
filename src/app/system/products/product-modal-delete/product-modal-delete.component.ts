import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-modal-delete',
  templateUrl: './product-modal-delete.component.html',
  styleUrls: ['./product-modal-delete.component.css']
})
export class ProductModalDeleteComponent implements OnInit {

  constructor(private productService: ProductService, private message: NzMessageService) { }

  @Input() modalIsVisible: boolean;
  @Input() userId: number;


  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();


  modalIsLoading = false;

  ngOnInit() {
  }

  handleOk(): void {
    this.modalIsLoading = true;


    // tslint:disable-next-line: forin


    if (this.userId != 0) {

      console.log(this.userId);
      this.productService.delete(this.userId).subscribe((data) => {
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Producto Eliminado exitosamente');
          this.emitReload();
        } else {
          this.modalIsLoading = false;
          this.message.error(data.message);
        }
      }, (error) => {

        if (error.status === 400) {

          console.log(error.error);

          let list = `<ul>`;

          // tslint:disable-next-line: forin
          for (let item in error.error.data) {
            list += `<li>${item}</li>`;
          }

          list += `</ul>`;

          this.message.error(`${error.error.message} <br> ${list}`);
        } else {
          this.message.error('Error en la petición');
          console.log(error);
        }

        this.modalIsLoading = false;
      });
    } else {
      this.message.warning('Complete el formulario');
      this.modalIsLoading = false;
    }
  }


  handleCancel(): void {
    this.closeModal();
  }

  closeModal(): void {

    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }


}
