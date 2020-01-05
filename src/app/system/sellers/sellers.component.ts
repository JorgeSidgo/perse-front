import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Seller } from 'src/app/entity/Seller';


@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {


  // MODALS

   addModalIsVisible = false;
   pointsModalIsVisible = false;
   editModalVisible= false;
   deleteModalIsVisible= false;
   

  // DATA
  gridIsLoading = true;
  dataList: any[];
  dataListEdit: Seller=new Seller();


  userPoints = 0;
  userName = ' ';
  userId = 0;

  constructor( private userService: UsersService) { }


  ngOnInit() {
     
    this.index();
  }

  showModal(): void {
    this.addModalIsVisible = true;
  }

  closeModal(): void {
    console.log("aqui se viene la mamada");
    this.addModalIsVisible = false;
  }
  closeModalEdit(): void {
    console.log("entrando al metodo de cierre de modal");
    this.editModalVisible= false;
  }
  closeModalDelete(): void{

    this.deleteModalIsVisible= false;
  }

  index(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataList = null;
    this.gridIsLoading = true;
    this.userService.getSellers().subscribe((data) => {
      this.dataList = data.data;
      console.log(data.data);
      this.gridIsLoading = false;
    })
  }
 
  loadDataEdit(id:number): void
  {
    this.userService.show(id).subscribe((data)=>{
      this.dataListEdit=data.data;
      console.log(this.dataListEdit);
    });
    {

    }
  }

  showModalEdit(id): void {
    this.userId=id;
    this.loadDataEdit(id);
    this.editModalVisible = true;
  }

  showModalDelete(id) : void{
    this.userId=id;
    this.deleteModalIsVisible = true;
  }

  




}