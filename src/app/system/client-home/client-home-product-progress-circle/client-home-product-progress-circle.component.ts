import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-client-home-product-progress-circle',
  templateUrl: './client-home-product-progress-circle.component.html',
  styleUrls: ['./client-home-product-progress-circle.component.css']
})
export class ClientHomeProductProgressCircleComponent implements OnInit {

  @Input() pointCost;
  @Input() points;
  @Input() final;
  @Input() type;

  constructor() { }

  ngOnInit() {

    if(this.points*100/this.pointCost>=100){
      this.final = 100;
    }else{
      this.final=Math.round(this.points*100/this.pointCost);
    }
    
  }

  

}
