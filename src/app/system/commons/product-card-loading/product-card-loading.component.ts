import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-loading',
  templateUrl: './product-card-loading.component.html',
  styleUrls: ['./product-card-loading.component.css']
})
export class ProductCardLoadingComponent implements OnInit {


  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
