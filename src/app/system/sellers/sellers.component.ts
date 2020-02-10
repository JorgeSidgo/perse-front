import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Seller } from 'src/app/entity/Seller';
import { Paging } from 'src/app/entity/Paging';


@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {


  // MODALS

  addModalIsVisible = false;
  pointsModalIsVisible = false;
  editModalVisible = false;
  deleteModalIsVisible = false;


  // DATA
  gridIsLoading = true;
  dataList = new Array();
  dataListEdit: Seller = new Seller();
  pagingData = new Paging();


  @Output() parentLoad = new EventEmitter<any>();

  userPoints = 0;
  userName = ' ';
  userId = 0;

  constructor(private userService: UsersService) { }


  ngOnInit() {

    this.index();
  }

  showModal(): void {
    this.addModalIsVisible = true;
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

  index(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataList = new Array();
    this.gridIsLoading = true;
    this.userService.getSellers().subscribe((data) => {
      this.dataList = data.data.data;
      if (data.data.data.length > 0) {
        this.pagingData.currentPage = data.data.current_page;
        this.pagingData.from = data.data.from;
        this.pagingData.to = data.data.to;
        this.pagingData.total = data.data.total;
        this.pagingData.lastPage = data.data.last_page;
      }
      this.gridIsLoading = false;
    });
  }

  loadDataEdit(id: number): void {
    this.userService.show(id).subscribe((data) => {
      this.dataListEdit = data.data;
    });

  }

  showModalEdit(id): void {
    this.userId = id;
    this.loadDataEdit(id);
    this.editModalVisible = true;
  }

  showModalDelete(id): void {
    this.userId = id;
    this.deleteModalIsVisible = true;
  }

  createArray(size: number): any {
    return new Array(size);
  }

  EventEmitter(): void {

    this.parentLoad.emit();

  }






}