import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from 'src/app/services/settings.service';
import { ProductService } from 'src/app/services/product.service';
import { Setting } from 'src/app/entity/Setting';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // FORMS
  settingForm: FormGroup;


  isLoading = false;
  settingList: any[];
  giftList: any[];

  constructor(
    private settingService: SettingsService,
    private productService: ProductService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { this.settingForm = this.fb.group({}); }

  ngOnInit() {
    this.getFields();
    this.loadGifts();
  }

  initForm(): void {
    this.settingForm = this.fb.group({});

    this.settingList.forEach(item => {
      this.settingForm.addControl(item.property, new FormControl(item.value, [Validators.required]));
    });

  }

  loadGifts(): void {
    this.productService.indexGift().subscribe(data => {
      this.giftList = data.data;
    });
  }

  getFields(): void {
    this.settingService.getSettings().subscribe(data => {
      this.settingList = data.data;
      this.initForm();
    });
  }

  saveSettings(): any {
    this.isLoading = true;
    let info = new Map();
    // tslint:disable-next-line: no-string-literal
    info.set('data', this.settingForm.value);

    this.settingService.updateSettings(this.settingForm.value).subscribe(data => {
      this.isLoading = false;
      console.log(data);
    });

    console.log(JSON.stringify(info));
  }

}
