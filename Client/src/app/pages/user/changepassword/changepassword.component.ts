import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from "../../../shared/material";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-changepassword',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent implements OnInit {
  changePassForm: any = FormGroup
  passwordVisible: boolean = false;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private toastService: ToastrService,
    private matDailog:MatDialogRef<ChangepasswordComponent>

  ) { }
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.changePassForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
      c_new_password: ['', Validators.required]
    })
  }
  submitForm() {
    const formdata = this.changePassForm.getRawValue();
    const newdata = { ...formdata, "user_id": this.userData.id }
    console.log(newdata);
    if (formdata.new_password != formdata.c_new_password) {
      this.toastService.warning('पासवर्ड र पुन पासवर्ड मेल खाएनन्', 'गुठी तिरो व्यवस्थापन प्रणाली')
      return;
    }
    this.authService.changepassword(newdata).subscribe(
      {next:(res:any)=>{
        if(res.status==true){
          this.toastService.success(res.message,'गुठी तिरो व्यवस्थापन प्रणाली')
          this.matDailog.close(true);
        }
      },
    error:(err:any)=>{
      console.log(err);
      this.toastService.warning(err.error?.message,'गुठी तिरो व्यवस्थापन प्रणाली')
    }}
    )

  }
  changeEye() {
    this.passwordVisible = !this.passwordVisible
  }
}
