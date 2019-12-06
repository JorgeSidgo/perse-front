import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // MODALS

  addModalIsVisible = false;

  // DATA
  gridIsLoading = true;
  dataList: any[];

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.index();
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  index(): void {
    this.loadData();
  }

  closeModal(): void {
    this.addModalIsVisible = false;
  }


  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.userService.getClients().subscribe((data) => {
      this.dataList = data.data;
      console.log(data.data);
      this.gridIsLoading = false;
    });
  }

}
