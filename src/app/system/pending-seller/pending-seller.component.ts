import { Component, OnInit } from '@angular/core';
import { RedemptionService } from 'src/app/services/redemption.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { resolve } from 'url';

@Component({
  selector: 'app-pending-seller',
  templateUrl: './pending-seller.component.html',
  styleUrls: ['./pending-seller.component.css']
})
export class PendingSellerComponent implements OnInit {

  // DATA
  gridIsLoading = true;
  dataList = new Array();
  userPoints = 0;
  userName = ' ';
  userId = 0;
  search_data = '';
  selectedObject: any;
  detailModalIsVisible = false;


  constructor(
    private redemptionService: RedemptionService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.index();
  }

  index(): void {
    this.search_data = '';
    this.loadData();
  }

  /*   getClientData(id: number) {
      this.pointsModalcontentLoading = true;
      this.userService.getUser(id).subscribe(data => {
        this.userPoints = data.data.points;
        this.userName = `${data.data.first_name} ${data.data.last_name}`;
        this.userId = data.data.id;
        this.pointsModalcontentLoading = false;
      });
    }
   */
  // searchClients() {
  //   if (this.search_data === '') {
  //     this.index();
  //   } else {
  //     this.dataList = null;
  //     this.gridIsLoading = true;
  //     this.userService.seachClients(this.search_data).subscribe((data) => {
  //       this.dataList = data.data;
  //       this.gridIsLoading = false;
  //     });
  //   }

  // }

  showModalChangeState(id: number): any {
    this.modalService.create({
      nzTitle: 'Completar canje',
      nzContent: '¿Desea marcar como completo este canje?',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => this.changeState(id, resolve))
    });
  }

  changeState(id: number, resolve: any): any {
    this.redemptionService.changeState(id).subscribe(data => {
      if (data.code) {
        this.message.success('Canje completado');
        this.loadData();
        resolve(data.code);
      } else {
        this.message.error(data.message);
        resolve(data);
      }
    });
  }

  searchRecords() {
    if (this.search_data == "")
      this.index();
    else {
      this.dataList = new Array();
      this.gridIsLoading = true;
      this.redemptionService.pendingSearch(this.search_data).subscribe((data) => {
        this.dataList = data.data;
        this.gridIsLoading = false;
      });
    }

  }

  getRecordData(recordId: number): void {
    this.detailModalIsVisible = true;
    this.selectedObject = this.dataList.filter(item => item.id === recordId);
  }

  closeDetailsModal(): void {
    this.detailModalIsVisible = false;
  }

  loadData(): void {
    this.dataList = new Array();
    this.gridIsLoading = true;
    this.redemptionService.pendingSeller().subscribe((data) => {
      this.dataList = Object.values(data.data);
      this.gridIsLoading = false;
    });
  }

}
