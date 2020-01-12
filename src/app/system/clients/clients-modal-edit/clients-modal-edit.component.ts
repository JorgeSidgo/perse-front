import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-clients-modal-edit',
  templateUrl: './clients-modal-edit.component.html',
  styleUrls: ['./clients-modal-edit.component.css']
})
export class ClientsModalEditComponent implements OnInit {


  
  //INPUTS
  @Input() modalIsVisible: boolean;
  @Input() dataList: Client;
  @Input() datoPrueba = "";
  id: number;


  //OUTPUTS
  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();



//Declaring dataVariables
editForm: FormGroup;
modalIsLoading = false;
contentLoading: boolean=false;




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
      birthday: [null,[Validators.required]]
    
    });
  }

  resolveForm(): Client {
    const sellertData = new Client();

    sellertData.first_name = this.editForm.value.first_name;
    sellertData.last_name = this.editForm.value.last_name;
    sellertData.email = this.editForm.value.email;
    sellertData.phone = this.editForm.value.phone;
    sellertData.birthday= this.editForm.value.birthday;
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
    
      console.log(this.resolveForm() + "  y el id es " + this.id);
      this.userService.updateClient(this.resolveForm(),this.id).subscribe((data) => {
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Cliente Editado exitosamente');
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
    this.modalIsVisible=false;
  }

  emitReload(): void {
    this.parentReload.emit();
  }

  loadDataEdit(id: number):void{
    
 
    this.id=id;
    this.modalIsVisible=true;
    this.contentLoading=true;
    this.userService.show(id).subscribe((data)=>{
      this.dataList=data.data;
      console.log(this.dataList);
        this.editForm.controls['first_name'].setValue(this.dataList.first_name);
        this.editForm.controls['last_name'].setValue(this.dataList.last_name);
        this.editForm.controls['email'].setValue(this.dataList.email);
        this.editForm.controls['phone'].setValue(this.dataList.phone);
        this.editForm.controls['birthday'].setValue(this.dataList.birthday );

    });
    this.contentLoading=false;
    
    
    

  }

}
