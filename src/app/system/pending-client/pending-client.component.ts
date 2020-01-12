import { Component, OnInit } from '@angular/core';
import { RedemptionService } from 'src/app/services/redemption.service';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/entity/Account';

@Component({
  selector: 'app-pending-client',
  templateUrl: './pending-client.component.html',
  styleUrls: ['./pending-client.component.css']
})
export class PendingClientComponent implements OnInit {

  // DATA
  gridIsLoading = true;
  dataList: any[];
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
    this.redemptionService.pendingClient(id).subscribe(data => {
      this.dataList = data.data;
      this.gridIsLoading = false;
    });
  }

}
