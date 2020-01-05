import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Seller } from 'src/app/entity/Seller';

@Component({
  selector: 'app-sellers-modal-edit',
  templateUrl: './sellers-modal-edit.component.html',
  styleUrls: ['./sellers-modal-edit.component.css']
})
export class SellersModalEditComponent implements OnInit {


  //INPUTS
  @Input() modalIsVisible: boolean;
  @Input() dataList: Seller = new Seller();
  @Input() datoPrueba = "";
  @Input() id: number;


  //OUTPUTS
  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();



//Declaring dataVariables
editForm: FormGroup;
modalIsLoading = false;



  constructor(private userService: UsersService,private fb: FormBuilder,private message: NzMessageService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      send_sms: [null]
    });
  }

  resolveForm(): Seller {
    const sellertData = new Seller();

    sellertData.first_name = this.editForm.value.first_name;
    sellertData.last_name = this.editForm.value.last_name;
    sellertData.email = this.editForm.value.email;
    sellertData.phone = this.editForm.value.phone;
    //sellertData.is_client = 0;
    //sellertData.password = "123";

    return sellertData;
  }


  handleOk(): void {
    this.modalIsLoading = true;
    

    // tslint:disable-next-line: forin
    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }

    if ( this.editForm.dirty && this.editForm.valid) {
      console.log(this.dataList);
      this.userService.updateSeller(this.dataList,this.id).subscribe((data) => {
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Vendedor Editado exitosamente');
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
    this.modalState.emit(false);
  }

  emitReload(): void {
    this.parentReload.emit();
  }





}
