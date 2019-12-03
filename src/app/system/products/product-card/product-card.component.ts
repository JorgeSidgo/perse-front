import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() nombreProducto;
  @Input() descProducto;
  @Input() imgProducto;

  constructor() { }

  ngOnInit() {
  }

  yes(): void {
    alert('simon');
  }

}
