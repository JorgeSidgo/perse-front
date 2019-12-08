import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { computed } from "mobx-angular";
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-clients-modal-points',
  templateUrl: './clients-modal-points.component.html',
  styleUrls: ['./clients-modal-points.component.css']
})
export class ClientsModalPointsComponent implements OnInit {


  // INPUTS

  @Input() modalIsVisible: boolean;

  @Input() clientData: Client;
  @Input() clientPoints = 0;
  @Input() clientId = 0;

  // OUTPUTS

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  // DATA
  modalIsLoading = false;
  typeValue: any;
  categorieValue: any;
  switchState = true;
  minPoints = 0;
  maxPoints = 100;
  // actionLabel = (this.switchState) ? 'Agregar' : 'Disminuir';

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


  /*   getActionLabel() {
      if (this.switchState) {
        return 'Agregar';
      } else {
        return 'Disminuir';
      }
    } */

  initForm(): void {
    this.pointsForm = this.fb.group({
      id_user: [null],
      points: [0, [Validators.required]],
      key: [this.switchState]
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

      this.pointsForm.value.id_user = this.clientId;
      console.log('form-data', this.pointsForm.value);


      this.usersService.updateClientPoints(this.pointsForm.value).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Puntos Actualizados');
          this.emitReload();
        } else {
          this.message.error(data.message);
        }
      });

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
    this.initForm();
  }

  emitReload(): void {
    this.parentReload.emit();
  }

}
