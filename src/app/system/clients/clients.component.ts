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
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  closeModal(): void {
    this.addModalIsVisible = false;
  }

}
