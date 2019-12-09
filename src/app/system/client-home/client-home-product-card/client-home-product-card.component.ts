import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-client-home-product-card',
  templateUrl: './client-home-product-card.component.html',
  styleUrls: ['./client-home-product-card.component.css']
})
export class ClientHomeProductCardComponent implements OnInit {

  @Input() nombreProducto;
  @Input() descProducto;
  @Input() imgProducto;

  constructor() { }

  ngOnInit() {
  }

}
