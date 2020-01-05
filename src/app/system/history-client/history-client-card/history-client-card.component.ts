import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-history-client-card',
  templateUrl: './history-client-card.component.html',
  styleUrls: ['./history-client-card.component.css']
})
export class HistoryClientCardComponent implements OnInit {

  constructor() { }

  @Input() nombreProducto;
  @Input() fechaRedemption;
  @Input() imgProducto;
  @Input() prodCost;

  @Input() fullObject;

  ngOnInit() {
  }

  public get formatedDate() {
    return moment(this.fechaRedemption).format('MM/DD/YYYY');
  }

}
