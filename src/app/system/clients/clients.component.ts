import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Client } from 'src/app/entity/Client';
import { Paging } from 'src/app/entity/Paging';

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
  pagingData = new Paging();
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
    this.loadData(1);
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
        if (data.data.data.length > 0) {
          this.pagingData.currentPage = data.data.current_page;
          this.pagingData.from = data.data.from;
          this.pagingData.to = data.data.to;
          this.pagingData.total = data.data.total;
          this.pagingData.lastPage = data.data.last_page;
        }


      });
    }

  }


  loadData(page: number): void {
    if (page <= this.pagingData.lastPage || page === 1) {
      this.dataList = new Array();
      this.gridIsLoading = true;
      this.userService.getClients(page).subscribe((data) => {
        this.dataList = data.data.data;
        if (data.data.data.length > 0) {
          this.pagingData.currentPage = data.data.current_page;
          this.pagingData.from = data.data.from;
          this.pagingData.to = data.data.to;
          this.pagingData.total = data.data.total;
          this.pagingData.lastPage = data.data.last_page;
          this.gridIsLoading = false;
        }
      });
    }


  }

  createArray(size: number): any {
    return new Array(size);
  }

  showModalDelete(id): void {
    this.userId = id;
    this.deleteModalIsVisible = true;
  }


}
