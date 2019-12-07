import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Client } from 'src/app/entity/Client';
import * as moment from 'moment';

@Component({
  selector: 'app-clients-modal-add',
  templateUrl: './clients-modal-add.component.html',
  styleUrls: ['./clients-modal-add.component.css']
})
export class ClientsModalAddComponent implements OnInit {

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
      birthday: [null, [Validators.required]],
      send_sms: [null]
    });
  }

  resolveForm(): Client {
    const clientData = new Client();

    clientData.first_name = this.addForm.value.first_name;
    clientData.last_name = this.addForm.value.last_name;
    clientData.email = this.addForm.value.email;
    clientData.phone = this.addForm.value.phone;
    clientData.birthday = moment(this.addForm.value.birthday).format('YYYY-MM-DD');
    clientData.is_client = 1;
    clientData.password = this.randomPass();

    return clientData;
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
          this.message.success('Cliente agregado exitosamente');
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

    console.log(this.randomPass());

  }

  randomPass(): any {

    let randomPassword = '';

    let alphanArray = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ];

    for (let index = 0; index < 7; index++) {

      let randomNum = Math.floor(Math.random() * alphanArray.length);

      randomPassword += alphanArray[randomNum];

    }

    return randomPassword;

  }

  updatePassValue(pass: string): void {
    this.passwordValue = pass;
  }

  updatePassConfValue(passConf: string): void {
    this.passwordConfValue = passConf;
  }

  handleCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.initForm();
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }

}
