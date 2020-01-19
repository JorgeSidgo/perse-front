import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-detail-modal',
  templateUrl: './exchange-detail-modal.component.html',
  styleUrls: ['./exchange-detail-modal.component.css']
})
export class ExchangeDetailModalComponent implements OnInit {

  @Input() detailData: any;
  @Input() modalIsVisible: boolean;

  @Output() modalState = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handleCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.modalState.emit(false);
  }

}
