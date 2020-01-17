import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-clients-modal-spam',
  templateUrl: './clients-modal-spam.component.html',
  styleUrls: ['./clients-modal-spam.component.css']
})
export class ClientsModalSpamComponent implements OnInit {

  // INPUTS
  @Input() modalIsVisible: boolean;
  @Input() contentLoading: boolean;


  // OUTPUTS

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  // DATA
  modalIsLoading = false;
  typeValue: any;
  categorieValue: any;
  image: any;

  // FORMS

  spamForm: FormGroup;

  constructor(
    private usuarioService: UsersService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.spamForm = this.fb.group({
      type: [null, [Validators.required]],
      data: [null, [Validators.required]]
    });
  }

  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.spamForm.controls) {
      this.spamForm.controls[i].markAsDirty();
      this.spamForm.controls[i].updateValueAndValidity();
    }

    if (this.spamForm.dirty && this.spamForm.valid) {



      this.usuarioService.sendSpam(this.spamForm.value).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Mensaje enviado exitosamente');
          this.initForm();
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
