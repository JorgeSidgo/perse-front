import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';

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
      password: [null, [Validators.required]],
      password_conf: [null, [Validators.required]]
    });
  }

  /*   resolveForm(): Product {
      return this.addForm.value as Product;
    }
   */
  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }

    if (this.addForm.dirty && this.addForm.valid) {
      console.log('form-data', this.addForm.value);
    }

    this.modalIsLoading = false;

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
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }

}
