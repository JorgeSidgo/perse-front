import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // MODALS

  addModalIsVisible = false;
  pointsModalIsVisible = false;
  pointsModalcontentLoading = false;

  // DATA
  gridIsLoading = true;
  dataList: any[];
  userData: Client;
  userPoints = 0;
  userName = ' ';
  userId = 0;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.index();
  }

  showPointsModal(idCliente: number): void {
    this.getClientData(idCliente);
    this.pointsModalIsVisible = true;
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  index(): void {
    this.loadData();
  }

  closePointsModal(): void {
    this.pointsModalIsVisible = false;
  }

  closeModal(): void {
    this.addModalIsVisible = false;
  }

  getClientData(id: number) {
    this.pointsModalcontentLoading = true;
    this.userService.getUser(id).subscribe(data => {
      console.log(data.data);
      this.userPoints = data.data.points;
      this.userName = `${data.data.first_name} ${data.data.last_name}`;
      this.userId = data.data.id;
      this.pointsModalcontentLoading = false;
    });
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
