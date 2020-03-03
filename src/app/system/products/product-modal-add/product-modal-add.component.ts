import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/entity/Product';

@Component({
  selector: 'app-product-modal-add',
  templateUrl: './product-modal-add.component.html',
  styleUrls: ['./product-modal-add.component.css']
})
export class ProductModalAddComponent implements OnInit {

  // INPUTS

  @Input() modalIsVisible: boolean;

  @Input() typeProductList: any[];
  @Input() categorieList: any[];

  // OUTPUTS

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  // DATA
  modalIsLoading = false;
  typeValue: any;
  categorieValue: any;
  fileList: UploadFile[] = [];
  image: any;

  // FORMS

  addForm: FormGroup;

  constructor(
    private productService: ProductService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      product_picture: [null, [Validators.required]],
      point_cost: [null, [Validators.required]],
      id_type: [null, [Validators.required]],
      id_categorie: [null, [Validators.required]]
    });
  }

  /* resolveImage(): any {
    let fileArray = [];
    let
  } */

  resolveForm(): Product {
    this.addForm.value.product_picture = this.image;
    return this.addForm.value as Product;
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];



    this.image = file;
    /*  var myReader: FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image = myReader.result;
     };
     myReader.readAsDataURL(file); */
  }

  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }



    console.log('form-data', this.addForm.value);

    if (this.addForm.dirty && this.addForm.valid) {
      /* this.productService.store(this.resolveForm()).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Producto agregado exitosamente');
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
      }); */
    } else {
      this.message.warning('Complete el formulario');
      this.modalIsLoading = false;
    }


  }

  /*   beforeUpload = (file: UploadFile): boolean => {
      this.fileList = this.fileList.concat(file);
      console.log(this.fileList);
      return this.http.request(req).subscribe(
        // tslint:disable-next-line no-any
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // tslint:disable-next-line:no-any
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            item.onSuccess!(event.body, item.file!, event);
          }
        },
        err => {
          item.onError!(err, item.file!);
        }
      );
    } */

  handleCancel(): void {
    this.closeModal();
    this.initForm();
  }

  closeModal(): void {
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }
}
