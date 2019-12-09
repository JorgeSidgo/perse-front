import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { computed } from "mobx-angular";
import { Client } from 'src/app/entity/Client';

@Component({
  selector: 'app-clients-modal-points',
  templateUrl: './clients-modal-points.component.html',
  styleUrls: ['./clients-modal-points.component.css']
})
export class ClientsModalPointsComponent implements OnInit {


  // INPUTS

  @Input() modalIsVisible: boolean;

  @Input() clientData: Client;
  @Input() clientPoints = 0;
  @Input() clientId = 0;
  @Input() clientName = ' ';
  @Input() contentLoading: boolean;

  // OUTPUTS

  @Output() modalState = new EventEmitter<boolean>();
  @Output() parentReload = new EventEmitter<any>();

  // DATA
  modalIsLoading = false;
  typeValue: any;
  categorieValue: any;
  switchState = true;
  minPoints = 0;
  maxPoints = 100;

  // FORMS

  pointsForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }


  initForm(): void {
    this.pointsForm = this.fb.group({
      id_user: [null],
      points: [0, [Validators.required]],
      key: [true]
    });
  }

  get actionLabel(): boolean {
    return this.pointsForm.value.key;
  }

  get maxPointsInput(): number {
    if (this.actionLabel) {
      return 100;
    } else {
      return this.clientPoints;
    }

  }

  handleOk(): void {
    this.modalIsLoading = true;

    // tslint:disable-next-line: forin
    for (const i in this.pointsForm.controls) {
      this.pointsForm.controls[i].markAsDirty();
      this.pointsForm.controls[i].updateValueAndValidity();
    }

    console.log('form-data', this.pointsForm.value);
    if (this.pointsForm.dirty && this.pointsForm.valid) {

      this.pointsForm.value.id_user = this.clientId;
      console.log('form-data', this.pointsForm.value);


      this.usersService.updateClientPoints(this.pointsForm.value).subscribe((data) => {
        console.log(data);
        this.closeModal();
        this.modalIsLoading = false;
        if (data.code) {
          this.message.success('Puntos Actualizados');
          this.emitReload();
        } else {
          this.message.error(data.message);
        }
      });

    } else {
      this.message.warning('Complete el formulario');
      this.modalIsLoading = false;
    }


  }

  handleCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.modalState.emit(false);
    this.initForm();
  }

  emitReload(): void {
    this.parentReload.emit();
  }

}
