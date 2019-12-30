import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {


  // MODALS

  addModalIsVisible = false;
  pointsModalIsVisible = false;

  // DATA
  gridIsLoading = true;
  dataList: any[];

  userPoints = 0;
  userName = ' ';
  userId = 0;

  constructor(
    private userService: UsersService
  ) { }


  ngOnInit() {
    this.index();
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  closeModal(): void {

  }

  index(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.userService.getSellers().subscribe((data) => {
      this.dataList = data.data;
      console.log(data.data);
      this.gridIsLoading = false;
    });
  }

}
