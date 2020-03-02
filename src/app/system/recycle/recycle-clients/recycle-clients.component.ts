import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-recycle-clients',
  templateUrl: './recycle-clients.component.html',
  styleUrls: ['./recycle-clients.component.css']
})
export class RecycleClientsComponent implements OnInit {

  isLoading = false;
  dataList = new Array();

  constructor(
    private userService: UsersService,
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDeletes();
  }

  getDeletes(): any {
    this.isLoading = true;
    this.userService.showDeletedClients().subscribe(data => {
      this.dataList = data.data;
      this.isLoading = false;
    });
  }

  showModalRestore(id: number): any {
    this.modalService.create({
      nzTitle: 'Restaurar Elemento',
      nzContent: '¿Desea restaurar este producto?',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => this.restoreDeleted(id, resolve))
    });
  }


  restoreDeleted(id: number, resolve: any): any {
    this.userService.restoreDeleted(id).subscribe(data => {
      if (data.code) {
        this.messageService.success('Elemento Restaurado');
        this.getDeletes();
        resolve(data.code);
      } else {
        this.messageService.error(data.message);
        resolve(data);
      }
    });
  }
}
