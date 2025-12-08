import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-add-shresta',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addshresta.component.html',
  styleUrl: './addshresta.component.css'
})
export class AddShrestaComponent implements OnInit {
  shrestaForm: any = FormGroup;
  guthiTypes: any;
  tenantTypes: any;
  userData: any;
  editData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private guthiService: GuthiService,
    private authService: AuthService,
    private matRef: MatDialogRef<AddShrestaComponent>) { }
  ngOnInit(): void {
   this.shrestaForm = this.formBuilder.group({
      guthi_type_id: ['', Validators.required],
      guthi_name: ['', Validators.required],
      tenant_type_id: ['', Validators.required],
      tenant_name: ['', Validators.required],
      tenant_address: ['', Validators.required],
      tenant_mobile_no: ['', [
        Validators.required,
        Validators.pattern(/^9\d{9}$/)
      ]]
    })

    if (this.data.id > 0) {
      this.loadEditData(this.data.id)

    }
    this.getGuthiTypes()
    this.getUserDetails()
  }
  loadEditData(id: any) {
    this.guthiService.getShrestaById(id).subscribe(
      (res: any) => {
        this.editData = res.data;
        console.log(this.editData)
        this.shrestaForm.setValue({
          guthi_type_id: this.editData[0].guthi_type_id,
          guthi_name: this.editData[0].guthi_name,
          tenant_type_id: this.editData[0].tenant_type_id,
          tenant_name: this.editData[0].tenant_name,
          tenant_address: this.editData[0].tenant_address,
          tenant_mobile_no: this.editData[0].tenant_mobile_no,
        })
        this.getTenantTypes(this.editData[0].guthi_type_id);
      }
    )
  }
  getGuthiTypes() {
    this.guthiService.getGuthiTypes().subscribe(
      (res: any) => {
        this.guthiTypes = res.data
        console.log(this.guthiTypes)
      }
    )

  }
  getTenantTypes(id: any) {
    this.guthiService.getTenantTypes(id).subscribe(
      (res: any) => {
        this.tenantTypes = res.data
        // console.log(this.tenantTypes)
      }
    )

  }
  getUserDetails() {
    this.userData = this.authService.getUser()    
  }
  changeformat() {
  const control = this.shrestaForm.get('tenant_address');
  
  if (control) {
    const englishToNepaliMap: { [key: string]: string } = {
      '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
      '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
    };

    const originalValue = control.value || '';
    const convertedValue = originalValue.replace(/[0-9]/g, (d:string) => englishToNepaliMap[d]);

    // Only update if value changed to avoid flickering
    if (originalValue !== convertedValue) {
      control.setValue(convertedValue, { emitEvent: false }); // Avoid triggering valueChanges again
    }
  }
}

  onSubmit() {
    try {
      const data = this.shrestaForm.value
      const newdata = { ...data, "officeid": this.userData.office_id, "userid": this.userData.id, "id": this.data.id }
      console.log(newdata);
      this.guthiService.addUpdateShresta(newdata).subscribe(
        (res: any) => {
          this.toaster.success(res.message);
          this.matRef.close(true);
        }
      )
    } catch (error: any) {
      this.toaster.error(error.message, "guthiTiro")
    }
  }

}
