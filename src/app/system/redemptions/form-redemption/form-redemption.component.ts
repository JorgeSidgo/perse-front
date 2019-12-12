import { Component, OnInit, Input } from '@angular/core';
import { TypeProduct } from 'src/app/entity/TypeProduct';
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-form-redemption',
  templateUrl: './form-redemption.component.html',
  styleUrls: ['./form-redemption.component.css']
})
export class FormRedemptionComponent implements OnInit {

  constructor() { }

  // INPUTS

  @Input() clientList: Client[];

  type_selected:number;
  clientState:boolean=true;
  productState:boolean=true;
  

  ngOnInit() {

  }

  optionList: Client[] = [];
  selectedUser: string;
  displayTips = true;

  
  activateClientSelect(){
    console.log("caca");
    this.clientState = false;
  }

  onSearch(value: string): void {
    if (value && value.length > 1) {
      this.displayTips = false;
    } else {
      this.optionList = [];
      this.displayTips = true;
    }
  }

}
