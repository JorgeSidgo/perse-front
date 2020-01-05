import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-modal-edit',
  templateUrl: './clients-modal-edit.component.html',
  styleUrls: ['./clients-modal-edit.component.css']
})
export class ClientsModalEditComponent implements OnInit {


  modalEditIsVisible = false;

  constructor() { }

  modalIsLoading = false;

  ngOnInit() {
  }

}
