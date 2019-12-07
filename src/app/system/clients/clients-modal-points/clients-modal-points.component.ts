import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-modal-points',
  templateUrl: './clients-modal-points.component.html',
  styleUrls: ['./clients-modal-points.component.css']
})
export class ClientsModalPointsComponent implements OnInit {


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

  // FORMS

  pointsForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.pointsForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      product_picture: [null, [Validators.required]],
      point_cost: [null, [Validators.required]],
      id_type: [null, [Validators.required]],
      id_categorie: [null, [Validators.required]]
    });
  }

  /*    resolveForm(): Product {
       return this.pointsForm.value as Product;
     }
    */
  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.pointsForm.controls) {
      this.pointsForm.controls[i].markAsDirty();
      this.pointsForm.controls[i].updateValueAndValidity();
    }


    console.log('form-data', this.pointsForm.value);

    if (this.pointsForm.dirty && this.pointsForm.valid) {
      /* this.productService.store(this.resolveForm()).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Producto agregado exitosamente');
          this.emitReload();
        } else {
          this.message.error(data.message);
        }
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
  }

  closeModal(): void {
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }

}
