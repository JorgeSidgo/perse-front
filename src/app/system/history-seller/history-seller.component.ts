import { Component, OnInit } from '@angular/core';
import { RedemptionService } from 'src/app/services/redemption.service';

@Component({
  selector: 'app-history-seller',
  templateUrl: './history-seller.component.html',
  styleUrls: ['./history-seller.component.css']
})
export class HistorySellerComponent implements OnInit {

  // DATA
  gridIsLoading = true;
  dataList: any[];
  userPoints = 0;
  userName = ' ';
  userId = 0;
  search_data = '';

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

  getRecordData(recordId: number): any {
    return this.dataList.filter(item => item.id === recordId);
  }


  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.redemptionService.historySeller().subscribe((data) => {
      this.dataList = Object.values(data.data);
      console.log(this.dataList.filter(item => item.id === 10));
      this.gridIsLoading = false;
    });
  }

}
