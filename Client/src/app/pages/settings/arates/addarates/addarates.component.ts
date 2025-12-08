import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuthiService } from '../../../../services/guthi.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addrates',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './addarates.component.html',
  styleUrl: './addarates.component.css'
})
export class AddaratesComponent implements OnInit {
  rateForm: any = FormGroup;
  userData: any;
  aabas: any;
  guthi_types: any;
  palika_types: any;
  land_types: any;
  land_sub_types: any;
  area_types: any;
  guthi_type_id:any =1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matDailogRef: MatDialogRef<AddaratesComponent>
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.rateForm = this.formbuilder.group(
      {
        start_aaba_id: ['', Validators.required],
        end_aaba_id:['', Validators.required],        
        palika_type_id: [[], Validators.required],
        land_type_id: [[], Validators.required],
        land_sub_type_id: [[], Validators.required],
        area_type_id: ['', Validators.required],
        rate: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
        unit_rate: [{ value: null, disabled: true }]
      }
    )
    this.getAabas();   
    this.getPalikaTypes();
    this.getLandTypes();
    this.getLandSubTypes();
    this.getAreaTypes();   


  }
  getAabas() {
    this.guthiService.getAabas().subscribe(
      {
        next: (res: any) => {
          this.aabas = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getPalikaTypes() {
    this.guthiService.getPalikaTypes().subscribe(
      {
        next: (res: any) => {
          this.palika_types = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getLandTypes() {
    this.guthiService.getLandTypes().subscribe(
      {
        next: (res: any) => {
          this.land_types = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getLandSubTypes() {
    this.guthiService.getLandSubTypes().subscribe(
      {
        next: (res: any) => {
          this.land_sub_types = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getAreaTypes() {
    this.guthiService.getAreaTypes().subscribe(
      {
        next: (res: any) => {
          this.area_types = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  onSubmit() {
    const formdata = this.rateForm.getRawValue();
    // console.log(formdata);
    const newdata = { ...formdata, user_id: this.userData.id, id: this.data.id, office_id: this.userData.office_id,guthi_type_id:this.guthi_type_id }
    console.log(newdata);
    this.guthiService.addUpdateRates(newdata).subscribe(
      {
        next: (res: any) => {
          if (res.status == true) {
            this.toaster.success(res.message);
            this.matDailogRef.close(true)
          }
        },
        error: (err: any) => {
          this.toaster.warning(err.message);
        }

      }
    )

  }
  areaToUnitRate() {
    const rate = this.rateForm.get('rate').value
    const type = this.rateForm.get('area_type_id').value
    var x = 0;
    if (type == 1) {
      x = rate / 256;
      x = +x.toFixed(2)

    }
    else if (type == 2) {
      x = rate / 1600
      x = +x.toFixed(2)
    }
    else if (type == 3) {
      x = rate
    }
    this.rateForm.get('unit_rate').setValue(x)
  } 
}
