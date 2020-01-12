import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() nombreProducto;
  @Input() descProducto;
  @Input() imgProducto;
  @Input() productId;

  @Output() parentReload = new EventEmitter<any>();



deleteModalIsVisible:boolean=false;
userId:number;

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
  }

  yes(): void {
    alert('simon yea ' + this.productId);
  }


  @Input() fullObject;




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
  closeModalEdit():void{
  }


  showModalDelete(id) : void{
    this.userId=id;
    this.deleteModalIsVisible = true;
  }
  closeModalDelete():void{
    
    this.deleteModalIsVisible = false;
  }

  loadData(): void{
    console.log("llego al reload del card");
    this.emitReload();
  }

  emitReload(): void {
    this.parentReload.emit();
  }
  


}
