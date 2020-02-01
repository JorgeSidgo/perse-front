import { Component, OnInit } from '@angular/core';
import { RedemptionService } from 'src/app/services/redemption.service';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/entity/Account';

@Component({
  selector: 'app-history-client',
  templateUrl: './history-client.component.html',
  styleUrls: ['./history-client.component.css']
})
export class HistoryClientComponent implements OnInit {

  // DATA
  gridIsLoading = true;
  dataList = new Array();
  account: Account;

  constructor(
    private redemptionService: RedemptionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.account = this.authService.getAccount();

    const userId = {
      id_client: this.account.id_user
    };

    this.getData(userId);
  }

  getData(id: any): any {
    this.gridIsLoading = true;
    this.redemptionService.historyClient(id).subscribe(data => {
      this.dataList = data.data;
      console.log(data.data);
      this.gridIsLoading = false;
    });
  }

}
