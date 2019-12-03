import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entity/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeProductService } from 'src/app/services/type-product.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // MODALS

  addModalIsVisible = false;

  // DATA
  gridIsLoading = true;
  dataList: Product[];
  typeProductList: any[];
  categorieList: any[];

  // ENTITIES


  constructor(
    private productService: ProductService,
    private typeProductService: TypeProductService,
    private categorieService: CategorieService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.index();
  }
  showModal(): void {
    this.addModalIsVisible = true;
  }

  index(): void {
    this.loadData();
    this.typeProductService.index().subscribe((data) => {
      this.typeProductList = data.data.data;
    });
    this.categorieService.index().subscribe((data) => {
      this.categorieList = data.data.data;
    });
  }

  closeModal(): void {
    this.addModalIsVisible = false;
  }

  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.productService.index().subscribe((data) => {
      this.dataList = data.data.data;
      this.gridIsLoading = false;
    });
  }

}
