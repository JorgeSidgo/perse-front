import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.css']
})
export class RecycleComponent implements OnInit {

  isLoading = false;
  selectedBin: any;

  constructor() { }

  ngOnInit() {
  }

  papeleraChange(event: any): any {

  }


}
