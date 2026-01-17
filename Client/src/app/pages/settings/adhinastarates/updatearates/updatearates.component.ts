import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuthiService } from '../../../../services/guthi.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updatearates',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './updatearates.component.html',
  styleUrl: './updatearates.component.css'
})
export class UpdatearatesComponent implements OnInit {
  rateForm: any = FormGroup;
  userData: any;
  aabas: any;
  guthi_types: any;
  palika_types: any;
  land_types: any;
  land_sub_types: any;
  area_types: any;
  guthi_type_id:any=1
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formbuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matDailogRef: MatDialogRef<UpdatearatesComponent>
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.rateForm = this.formbuilder.group(
      {
        start_aaba_id: ['', Validators.required],
        end_aaba_id: ['', Validators.required],        
        palika_type_id: [[], Validators.required],
        land_type_id: [[], Validators.required],
        land_sub_type_id: [[], Validators.required],
        area_type_id: ['', Validators.required],
        rate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        unit_rate: [{ value: null, disabled: true }]
      }
    )
    this.getAabas();
    this.userData=this.authService.getUser()    
    
  }
  getAabas() {   
    this.guthiService.getAll({table_name:"aabas"}).subscribe(
      {
        next: (res: any) => {
          this.aabas = res.data;
          console.log('aaba loaded');
          this.getPalikaTypes();          
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
 getPalikaTypes() {  
    this.guthiService.getAll({ table_name:"palika_type"}).subscribe(
      {
        next: (res: any) => {
          this.palika_types = res.data;
          console.log('palika_type loaded');
          this.getLandTypes();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getLandTypes() {    
    this.guthiService.getAll({table_name:"land_type"}).subscribe(
      {
        next: (res: any) => {
          this.land_types = res.data;
          console.log('land type loaded');
          this.getLandSubTypes();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getLandSubTypes() {    
    this.guthiService.getAll({table_name:"land_sub_type"}).subscribe(
      {
        next: (res: any) => {
          this.land_sub_types = res.data;
          console.log('land_sub_type loaded')
          this.getAreaTypes();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  getAreaTypes() {   
    this.guthiService.getAll({table_name:'area_type'}).subscribe(
      {
        next: (res: any) => {
          this.area_types = res.data;
          if(this.aayekodata.data.id>0){
            this.loadEditData(this.aayekodata.data)
          }
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
    const newdata = { ...formdata, user_id: this.userData.id, id: this.aayekodata.data.id, office_id: this.userData.office_id,guthi_type_id:this.guthi_type_id }
    console.log(newdata);
    this.guthiService.addUpdateARates(newdata).subscribe(
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
  loadEditData(data:any) {
    console.log(data);    
            this.rateForm.setValue({
              start_aaba_id: data.start_aaba_id,              
              end_aaba_id: data.end_aaba_id,
              palika_type_id: data.palika_type_id,
              land_type_id: data.land_type_id,
              land_sub_type_id: data.land_sub_type_id,
              area_type_id: data.area_type_id,
              rate: data.rate,
              unit_rate: data.unit_rate
            })
         
      
          }
  
}
