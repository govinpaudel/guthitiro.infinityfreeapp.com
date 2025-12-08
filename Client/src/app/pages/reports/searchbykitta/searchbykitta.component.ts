import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbykitta',
  imports: [MaterialModule, CommonModule, FormErrorComponent, ReactiveFormsModule],
  templateUrl: './searchbykitta.component.html',
  styleUrl: './searchbykitta.component.css'
})
export class SearchbykittaComponent implements OnInit {
  userData: any;
  palikas: any;
  gabisas: any;
  wards: any;
  details: any;
  landForm: any = FormGroup;
  constructor(private formbuilder: FormBuilder,
    private authservice: AuthService,
    private guthiservice: GuthiService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.landForm = this.formbuilder.group(
      {
        palika_id: ['', Validators.required],
        gabisa_id: ['', Validators.required],
        ward_no: ['', Validators.required],
        kitta_no: ['', Validators.required]
      }
    )
    this.userData = this.authservice.getUser();
    console.log(this.userData);
    this.loadPalikas(this.userData.office_id)
  }
  loadPalikas(id: any) {
    this.guthiservice.getDistinctPalika(id).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.palikas = res.data;

        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )

  }
  loadGabisas() {
    this.guthiservice.getDistinctGabisa(this.landForm.get('palika_id').value).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.gabisas = res.data;

        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }
  loadWards() {
    this.guthiservice.getDistinctWards(this.landForm.get('gabisa_id').value).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.wards = res.data;

        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }
  onSubmit() {
    const formdata = this.landForm.value;
    const newdata = { ...formdata, "office_id": this.userData.office_id }
    console.log(newdata);
    this.guthiservice.getKittaDetails(newdata).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.details = res.data
        },
        error: (error: any) => {
          console.log(error)
        }
      }

    )

  }
viewShrestaDetails(shresta_id: any,guthi_type_id:any) {
    console.log('shresta_id',shresta_id,'guthi_type_id',guthi_type_id);
    this.router.navigateByUrl('dashboard/viewshrestadetails', { state: { shresta_id: shresta_id,guthi_type_id:guthi_type_id } });
  }

}
