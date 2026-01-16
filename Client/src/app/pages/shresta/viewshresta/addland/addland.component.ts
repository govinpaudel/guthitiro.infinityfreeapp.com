import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../shared/material';
import { GuthiService } from '../../../../services/guthi.service';
import { AuthService } from '../../../../services/auth.service';
import { AreaToUnitsService } from '../../../../services/area-to-units.service';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';

@Component({
  selector: 'app-addland',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule,FormErrorComponent],
  templateUrl: './addland.component.html',
  styleUrl: './addland.component.css'
})
export class AddLandComponent implements OnInit {
  landForm: any = FormGroup;
  states: any;
  districts: any;
  palika_types: any;
  palikas: any;
  gabisas: any;
  wards: any;
  land_types: any;
  land_sub_types: any;
  area_types: any;
  userData: any;
  editData: any;
  msg: any;
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formbuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private areaToUnitsService: AreaToUnitsService,
    private toaster: ToastrService,
    private matDailogRef: MatDialogRef<AddLandComponent>) { }
  ngOnInit(): void {
    this.landForm = this.formbuilder.group(
      {
        shresta_id: ['', Validators.required],
        state_id: ['', Validators.required],
        district_id: ['', Validators.required],
        palika_type_id: ['', Validators.required],
        palika_id: ['', Validators.required],
        gabisa_id: ['', Validators.required],
        ward_no: ['', Validators.required],
        land_type_id: ['', Validators.required],
        land_sub_type_id: ['', Validators.required],
        kitta_no: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        area_type_id: ['', Validators.required],
        area: ['', [Validators.required, Validators.pattern(/^[0-9\-]+$/)]],
        area_units: [{ value: null, disabled: true }]
      }
    )
    this.getUserDetails()
    this.getStates()
    this.getWards()
    this.getAreaTypes()
    this.getLandTypes()
    this.getLandSubTypes()
    console.log('aayekodata',this.aayekodata)
    this.landForm.patchValue({
          shresta_id: this.aayekodata.shresta.shresta_id
        })
    if(this.aayekodata.land.id>0){
    this.getEditData(this.aayekodata.land)
    }     
    
  }
  getEditData(land: any) {   
    console.log("editdata",land) 
        this.landForm.setValue({
          shresta_id: land.shresta_id,
          state_id: land.state_id,
          district_id: land.district_id,
          palika_type_id: land.palika_type_id,
          palika_id: land.palika_id,
          gabisa_id: land.gabisa_id,
          ward_no: land.ward_no,
          kitta_no: land.kitta_no,
          land_type_id: land.land_type_id,
          land_sub_type_id: land.land_sub_type_id,
          area_type_id: land.area_type_id,
          area: land.area,
          area_units: land.area_units
        })
        this.areaToUnits();
        this.getdistrictByState(land.state_id)
        this.getLocalTypesByDistrict(land.district_id)
        this.getPalikaByDistrictAndType()
        this.gabisaByDistrictAndPalikaId()      
    
  }
  getUserDetails() {
    this.userData = this.authService.getUser()
  }
  getStates() {    
    this.guthiService.getAll({table_name:"states"}).subscribe(
      (res: any) => {
        this.states = res.data;
        console.log('getStates', 'data', this.states)
      }
    )
  }
  getdistrictByState(id: any) {
    this.guthiService.getdistrictByState(id).subscribe(
      (res: any) => {
        this.districts = res.data;
        console.log('getDistrictById', id, 'data', this.districts);
      }
    )

  }
  getLocalTypesByDistrict(id: any) {
    this.guthiService.getLocalTypesByDistrict(id).subscribe(
      (res: any) => {
        this.palika_types = res.data;
        console.log('getLocalTypeByDistrict', id, 'data', this.palika_types);
      }
    )
  }
  getPalikaByDistrictAndType() {
    const formdata = this.landForm.getRawValue();
    // console.log(formdata);
    this.guthiService.getPalikaByDistrictAndType(formdata.district_id, formdata.palika_type_id).subscribe(
      (res: any) => {
        this.palikas = res.data;
        console.log('getPalikaByDistrictAndType', 'data', this.palikas);
      }
    )
  }
  gabisaByDistrictAndPalikaId() {
    const formdata = this.landForm.getRawValue();
    // console.log(formdata);
    this.guthiService.gabisaByDistrictAndPalikaId(formdata.district_id, formdata.palika_id).subscribe(
      (res: any) => {
        this.gabisas = res.data;
        console.log('gabisaByDistrictAndPalikaId', formdata.district_id, formdata.palika_id, 'data', this.gabisas);
      }
    )
  }
  getPalikaTypes() {    
    this.guthiService.getAll({table_name:'palika_type'}).subscribe(
      (res: any) => {
        this.palika_types = res.data;
        console.log('getPalikaTypes', this.palika_types);
      }
    )
  }
  getWards() {    
    this.guthiService.getAll({table_name:'wards' }).subscribe(
      (res: any) => {
        this.wards = res.data;
        console.log('loadWards', this.wards);
      }
    )
  }

  getLandTypes() {    
    this.guthiService.getAll({table_name:'land_type'}).subscribe(
      (res: any) => {
        this.land_types = res.data;
        console.log('getLandTypes', this.land_types);
      }
    )
  }

  getLandSubTypes() {    
    this.guthiService.getAll({table_name:'land_sub_type'}).subscribe(
      (res: any) => {
        this.land_sub_types = res.data;
        console.log('getLandSubTypes', this.land_sub_types);
      }
    )
  }

  getAreaTypes() {   
    this.guthiService.getAll({table_name:'area_type'}).subscribe(
      (res: any) => {
        this.area_types = res.data;
        console.log('loadAreaTypes', this.area_types);
      }
    )
  }
  onSubmit() {
    const formdata = this.landForm.getRawValue();
    console.log(formdata);
    const newdata = { ...formdata, office_id: this.userData.office_id, user_id: this.userData.id, land_id: this.aayekodata.land.id,guthi_type_id: this.aayekodata.shresta.guthi_type_id }
    console.log("new data",newdata);
    this.guthiService.AddOrUpdateLand(newdata).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          if (res.status == true) {
            this.toaster.success(res.message);
            this.matDailogRef.close(true)
          }
          else {
            this.toaster.warning(res.message);
          }

        },
        error: (err: any) => {
          console.log(err);
          this.toaster.warning(err.message)
        }
      }
    )
  }
  areaToUnits() {
    const data = this.landForm.get('area')?.value ?? '';
    const newdata1 = data.replace(/[.,]/g, '-');
    this.landForm.get('area').setValue(newdata1)
    const type = this.landForm.get('area_type_id').value
    const newdata = this.areaToUnitsService.areaToUnits(data, type)
    this.landForm.get('area_units').setValue(newdata);    
  }
}
