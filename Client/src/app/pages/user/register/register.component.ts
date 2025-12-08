import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { RouterLink } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
signupForm:any= FormGroup;
officeList: any;
  constructor(private formbuilder:FormBuilder,
    private authService:AuthService,
    private toaster:ToastrService
  ){

  }
  ngOnInit(): void {
  this.signupForm=this.formbuilder.group({
    username:[null,[Validators.required]],
    email: [null, [Validators.required,Validators.email]],
    engname: [null, [Validators.required]],
    nepname: [null, [Validators.required]],
    password: [null, [Validators.required]],
    confirmpassword: [null, [Validators.required]],
    contactno: [null, [Validators.required]],
    officeid: [null, [Validators.required]],
  })  
  this.loadOffices();  
  }
  loadOffices() {    
    this.authService.getAllOffices().subscribe(
      (res: any) => { 
        this.officeList = res.data 
        // console.log(this.officeList) 
    }
      ,
      (error) => { console.log(error) })
  }
  onSignUp() {    
    this.authService.register(this.signupForm.value).subscribe(
      {next:(res:any)=>{
        this.toaster.success(res.message,"गुठी तिरो व्यवस्थापन प्रणाली");
      }
      ,error:(err:any)=>{
        console.log(err);
      }

      }
      
    )
  }

}
