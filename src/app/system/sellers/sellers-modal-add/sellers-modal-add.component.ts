import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Seller } from 'src/app/entity/Seller';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-sellers-modal-add',
  templateUrl: './sellers-modal-add.component.html',
  styleUrls: ['./sellers-modal-add.component.css']
})
export class SellersModalAddComponent implements OnInit {


  // INPUTS

  @Input() modalIsVisible: boolean;

  // OUTPUTS

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  // DATA
  modalIsLoading = false;
  typeValue: any;
  categorieValue: any;

  passwordValue: string;
  passwordConfValue: string;

  // FORMS

  addForm: FormGroup;

  constructor(
    private userService: UsersService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.addForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      send_sms: [null]
    });
  }

  resolveForm(): Seller {
    const sellertData = new Seller();

    sellertData.first_name = this.addForm.value.first_name;
    sellertData.last_name = this.addForm.value.last_name;
    sellertData.email = this.addForm.value.email;
    sellertData.phone = this.addForm.value.phone;
    sellertData.is_client = 0;
    sellertData.password = "123";

    return sellertData;
  }


  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }

    if (this.addForm.dirty && this.addForm.valid) {
      console.log('form-data', this.addForm.value);
      this.userService.signup(this.resolveForm()).subscribe((data) => {
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Vendedor agregado exitosamente');
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
    this.initForm();

    console.log("Entrando al event emiter");
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }


}
