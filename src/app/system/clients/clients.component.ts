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
  editModalVisible = false;
  deleteModalIsVisible = false;
  spamModalIsVisible = false;
  spamModalContentLoading = false;
  spamIsMassive: boolean;
  spamUserId: number;

  // DATA
  gridIsLoading = true;
  dataList = new Array();
  userData: Client;
  userPoints = 0;
  userName = ' ';
  userId = 0;
  search_data: string = "";

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

  showSpamModal(isMassive: boolean, userId: number): void {
    this.spamUserId = userId;
    this.spamIsMassive = isMassive;
    this.spamModalIsVisible = true;
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  index(): void {
    this.search_data = "";
    this.loadData();
  }

  closePointsModal(): void {
    this.pointsModalIsVisible = false;
  }

  closeSpamModal(): void {
    this.spamModalIsVisible = false;
  }

  closeModal(): void {
    this.addModalIsVisible = false;
  }

  closeModalEdit(): void {

    this.editModalVisible = false;
  }
  closeModalDelete(): void {

    this.deleteModalIsVisible = false;
  }
  getClientData(id: number) {
    this.pointsModalcontentLoading = true;
    this.userService.getUser(id).subscribe(data => {
      this.userPoints = data.data.points;
      this.userName = `${data.data.first_name} ${data.data.last_name}`;
      this.userId = data.data.id;
      this.pointsModalcontentLoading = false;
    });
  }

  searchClients() {
    if (this.search_data == "")
      this.index();
    else {
      this.dataList = new Array();
      this.gridIsLoading = true;
      this.userService.seachClients(this.search_data).subscribe((data) => {
        this.dataList = data.data.data;
        this.gridIsLoading = false;
      });
    }

  }


  loadData(): void {
    this.dataList = new Array();
    this.gridIsLoading = true;
    this.userService.getClients().subscribe((data) => {
      this.dataList = data.data.data;
      this.gridIsLoading = false;
    });
  }


  showModalDelete(id): void {
    this.userId = id;
    this.deleteModalIsVisible = true;
  }


}
