import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { AuthService } from '../../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-login',
    imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any = FormGroup;
  passwordVisible: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private loader:NgxUiLoaderService
  ) { }
  ngOnInit(): void {
    {
      this.loginForm = this.formBuilder.group(
        {
          username: ['', Validators.required],
          password: ['', Validators.required],
        }
      )

    }

  }
  changeEye() {
    this.passwordVisible = !this.passwordVisible
  }


  submitForm() {
    this.loader.start()
        try {
      this.authService.login(this.loginForm.value)
  .subscribe({
    next: (res: any) => {
      // console.log(res);
      if (res.status === true) {
        this.toastr.success(res.message, 'गुठी तिरो व्यवस्थापन प्रणाली');
        sessionStorage.setItem('aToken', res.access_token);
        sessionStorage.setItem('rToken', res.refresh_token);
        sessionStorage.setItem('userDetails', JSON.stringify(res.data));
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.warning(res.message, 'गुठी तिरो व्यवस्थापन प्रणाली');
      }
    },
    error: (err: any) => {
      // console.log(err);
      this.toastr.warning(err.error.message, 'गुठी तिरो व्यवस्थापन प्रणाली');
    }
  });
    } catch (err: any) {      
      this.toastr.warning('err.error.message', 'गुठी तिरो व्यवस्थापन प्रणाली')
    }
    this.loader.stop()
  }
  
}
