import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!:FormGroup
  restaurantModelObject:RestaurantData=new RestaurantData
  showAdd!:boolean
  showBtn!:boolean
  allRestaurant: any
  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      email:[''],
      address:[''],
      mobile:[''],
      service:[''],
    })
    this.getAllData()
  }
  clickAddRestro(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }

  //subscribing the data 

  addRestro(){
    this.restaurantModelObject.name=this.formValue.value.name
    this.restaurantModelObject.email=this.formValue.value.email
    this.restaurantModelObject.address=this.formValue.value.address
    this.restaurantModelObject.mobile=this.formValue.value.mobile
    this.restaurantModelObject.service=this.formValue.value.service

    this.api.postRestaurant(this.restaurantModelObject).subscribe(res=>{
      console.log(res)
      alert("This is added successfully")
      this.formValue.reset()
      this.getAllData()                                                   //to show the data as soon as ok is clicked
    }
    )
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      return this.allRestaurant=res
    })
  }

 //delete the dat 
 deleteRestro(data:any){
  this.api.deleteRestaurant(data.id).subscribe(
    res=>{
      alert("delete")
      this.getAllData()
    }
  )

 }
 editRestro(data:any){
  this.showAdd=false;
    this.showBtn=true;
  this.restaurantModelObject.id=data.id
  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['address'].setValue(data.address)
  this.formValue.controls['mobile'].setValue(data.mobile)
  this.formValue.controls['service'].setValue(data.service)



 }
 updateRestro(){
    this.restaurantModelObject.name=this.formValue.value.name
    this.restaurantModelObject.email=this.formValue.value.email
    this.restaurantModelObject.address=this.formValue.value.address
    this.restaurantModelObject.mobile=this.formValue.value.mobile
    this.restaurantModelObject.service=this.formValue.value.service

    this.api.updateRestaurant(this.restaurantModelObject,this.restaurantModelObject.id).subscribe(res=>{
      alert("Update successfull")
      this.formValue.reset()
      this.getAllData()
    })

 }
}
