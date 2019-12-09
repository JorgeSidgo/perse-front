import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-client-home-product-card-loading',
  templateUrl: './client-home-product-card-loading.component.html',
  styleUrls: ['./client-home-product-card-loading.component.css']
})
export class ClientHomeProductCardLoadingComponent implements OnInit {

  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
