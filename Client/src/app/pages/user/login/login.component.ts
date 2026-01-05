import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { AuthService } from '../../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

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
    private loader: NgxUiLoaderService
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
  if (this.loginForm.invalid) return;

  this.loader.start();

  this.authService.login(this.loginForm.value)
    .pipe(
      finalize(() => {
        // ✅ ALWAYS runs (success, failure, error)
        this.loader.stop();
      })
    )
    .subscribe({
      next: (res: any) => {

        // ✅ API returned text instead of JSON
        if (typeof res === 'string') {
          location.reload();
          return;
        }

        if (res?.status === true) {
          this.toastr.success(res.message, 'गुठी तिरो व्यवस्थापन प्रणाली');
          sessionStorage.setItem('aToken', res.access_token);
          sessionStorage.setItem('rToken', res.refresh_token);
          sessionStorage.setItem('userDetails', JSON.stringify(res.data));
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.warning(
            res?.message || 'Login failed',
            'गुठी तिरो व्यवस्थापन प्रणाली'
          );
        }
      },

      error: (err: any) => {

        // ✅ Backend sent text / HTML
        if (typeof err?.error === 'string') {
          location.reload();
          return;
        }

        this.toastr.warning(
          err?.error?.message || 'Server error',
          'गुठी तिरो व्यवस्थापन प्रणाली'
        );
      }
    });
}
 

}
