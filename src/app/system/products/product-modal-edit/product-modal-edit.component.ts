import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/entity/Product';
import { TypeProductService } from 'src/app/services/type-product.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-product-modal-edit',
  templateUrl: './product-modal-edit.component.html',
  styleUrls: ['./product-modal-edit.component.css']
})
export class ProductModalEditComponent implements OnInit {
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
  dataList: Product;
  imgProducto: any;
  productId: number;



  // FORMS

  editForm: FormGroup;

  constructor(
    private productService: ProductService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private typeProductService: TypeProductService,
    private categorieService: CategorieService
  ) { }

  ngOnInit() {
    this.initForm();
    this.cargarCatalogos();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      product_picture: [null],
      point_cost: [null, [Validators.required]],
      id_type: [null, [Validators.required]],
      id_categorie: [null, [Validators.required]]
    });
  }

  loadData(id: number): void {
    this.productService.show(id).subscribe((data) => {
      this.dataList = data.data;
      this.editForm.controls['name'].setValue(this.dataList.name);
      this.editForm.controls['description'].setValue(this.dataList.description);
      this.editForm.controls['point_cost'].setValue(data.data.point_cost);
      this.editForm.controls['id_type'].setValue(data.data.id_type);
      this.editForm.controls['id_categorie'].setValue(data.data.id_categorie);
      this.imgProducto = data.data.product_picture;
      this.productId = id;
      console.log(this.editForm.value);
    });


    this.modalIsVisible = true;

  }

  handleCancel(): void {
    this.closeModal();
    this.initForm();
    this.modalIsVisible = false;
  }

  closeModal(): void {
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }

  cargarCatalogos(): void {

    this.typeProductService.index().subscribe((data) => {
      this.typeProductList = data.data.data;
    });
    this.categorieService.index().subscribe((data) => {
      this.categorieList = data.data.data;
    });

  }
  resolveForm(): any {
    let formData = new FormData();
    let productObj: Product;
    this.editForm.value.product_picture = this.image;
    /*     productObj = this.editForm.value as Product;
    
        console.log('Product', productObj); */

    formData.append('product_picture', this.image);
    formData.append('name', this.editForm.get('name').value);
    formData.append('description', this.editForm.get('description').value);
    formData.append('id_type', this.editForm.get('id_type').value);
    formData.append('id_categorie', this.editForm.get('id_categorie').value);
    formData.append('point_cost', this.editForm.get('point_cost').value);

    console.log('formData', JSON.stringify(formData));

    return formData;
  }
  changeListener($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    /*     var file = ;
        var myReader: FileReader = new FileReader(); */

    this.image = inputValue.files[0] as File;

    console.log(this.image);


    /* myReader.onloadend = (e) => {
      this.image = myReader.result;

    };
    myReader.readAsDataURL(file); */


  }
  //Guardando datos a modificar del producto.
  handleOk(): void {

    this.modalIsLoading = true;
    console.log(this.image);
    // tslint:disable-next-line: forin
    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }

    if (this.editForm.dirty && this.editForm.valid) {
      this.productService.update(this.resolveForm(), this.productId).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Producto modificado exitosamente');
          // this.emitReload();
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


}
