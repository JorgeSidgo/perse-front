import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-client-home-product-card',
  templateUrl: './client-home-product-card.component.html',
  styleUrls: ['./client-home-product-card.component.css']
})
export class ClientHomeProductCardComponent implements OnInit {

  @Input() nombreProducto;
  @Input() descProducto;
  @Input() imgProducto;
  @Input() userPoint;
  @Input() prodCost;

  @Input() fullObject;


  constructor(
    private modalService: NzModalService
  ) { }

  detailsModal(): void {

    console.log(this.fullObject);

    const obj = this.fullObject;

    const content = `
      <h2>${obj.name}</h2>

      <ul class="details-list">
        <li>
          <b>Categoría: </b>${obj.cname}
        </li>
        <li>
          <b>Tipo: </b>${obj.tname}
        </li>
        <li>
          <b>Precio en puntos: </b>${obj.point_cost}
        </li>
        <li>
          <b>Descripción: </b>${obj.description}
        </li>
      </ul>
    `;

    this.modalService.info({
      nzTitle: 'Detalles del Producto',
      nzContent: content
    });
  }

  ngOnInit() {
  }

}
