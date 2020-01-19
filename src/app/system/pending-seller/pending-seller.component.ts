import { Component, OnInit } from '@angular/core';
import { RedemptionService } from 'src/app/services/redemption.service';

@Component({
  selector: 'app-pending-seller',
  templateUrl: './pending-seller.component.html',
  styleUrls: ['./pending-seller.component.css']
})
export class PendingSellerComponent implements OnInit {

  // DATA
  gridIsLoading = true;
  dataList: any[];
  userPoints = 0;
  userName = ' ';
  userId = 0;
  search_data = '';
  selectedObject: any;
  detailModalIsVisible = false;

  constructor(
    private redemptionService: RedemptionService
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

  getRecordData(recordId: number): void {
    this.detailModalIsVisible = true;
    this.selectedObject = this.dataList.filter(item => item.id === recordId);
  }

  closeDetailsModal(): void {
    this.detailModalIsVisible = false;
  }

  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.redemptionService.pendingSeller().subscribe((data) => {
      this.dataList = Object.values(data.data);
      this.gridIsLoading = false;
    });
  }

}
