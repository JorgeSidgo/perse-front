
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sellers-modal-delete',
  templateUrl: './sellers-modal-delete.component.html',
  styleUrls: ['./sellers-modal-delete.component.css']
})
export class SellersModalDeleteComponent implements OnInit {

  constructor(private userService: UsersService,
    private message: NzMessageService) { }

  @Input() modalIsVisible: boolean;
  @Input() userId : number;

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  modalIsLoading = false;


  ngOnInit() {
  }

  //Eliminando vendedor
  handleOk(): void {
    this.modalIsLoading = true;
    

    // tslint:disable-next-line: forin
   

    if (this.userId!=0) {
    
      console.log(this.userId);
      this.userService.deleteUser(this.userId).subscribe((data) => {
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Vendedor Eliiminado exitosamente');
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
 
    this.modalState.emit(false);
  }
 
  emitReload(): void {
    this.parentReload.emit();
  }
  

}
