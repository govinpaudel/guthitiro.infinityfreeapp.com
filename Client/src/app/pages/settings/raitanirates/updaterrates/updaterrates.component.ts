import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuthiService } from '../../../../services/guthi.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updaterrates',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './updaterrates.component.html',
  styleUrl: './updaterrates.component.css'
})
export class UpdaterratesComponent implements OnInit {
  rateForm: any = FormGroup;
  userData: any;
  aabas: any;  
  palika_types: any;  
  area_types: any;
  guthi_type_id:any=2;
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formbuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matDailogRef: MatDialogRef<UpdaterratesComponent>
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.rateForm = this.formbuilder.group(
      {
        start_aaba_id: ['', Validators.required],
        end_aaba_id: ['', Validators.required],        
        palika_type_id: [[], Validators.required],        
        area_type_id: ['', Validators.required],
        rate: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
        unit_rate: [{ value: null, disabled: true }]
      }
    )
    this.getAabas();    
       
     
    
  }
  getAabas() {    
    this.guthiService.getAll({table_name:'aabas'}).subscribe(
      {
        next: (res: any) => {
          this.aabas = res.data;
          console.log('aabas loaded');
          this.getPalikaTypes();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  
  getPalikaTypes() {   
    this.guthiService.getAll({table_name:'palika_type'}).subscribe(
      {
        next: (res: any) => {
          this.palika_types = res.data;
          console.log('palika loaded');
          this.getAreaTypes()
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
  
   getAreaTypes() {
    const data={
      table_name:'area_type'
    }
    this.guthiService.getAll(data).subscribe(
      {
        next: (res: any) => {
          this.area_types = res.data;
          console.log('area type loaded');
          this.loadEditData(this.aayekodata.data);          
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
    // const newdata = { ...formdata, user_id: this.userData.id, id: this.data.id, office_id: this.userData.office_id,guthi_type_id:this.guthi_type_id }
    // console.log(newdata);
    this.guthiService.addUpdateRates(formdata).subscribe(
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
    console.log('I am patching',data);
    if (data.id > 0) {
      
            this.rateForm.patchValue({
              start_aaba_id: data.start_aaba_id,
              end_aaba_id: data.end_aaba_id,              
              palika_type_id: data.palika_type_id,              
              area_type_id: data.area_type_id,
              rate: data.rate,
              unit_rate: data.unit_rate
            })}}
         

        
      
    
  
}
