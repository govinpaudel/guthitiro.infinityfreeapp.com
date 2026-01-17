import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-shresta',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addshresta.component.html',
  styleUrl: './addshresta.component.css'
})
export class AddShrestaComponent implements OnInit {
  shrestaForm: any = FormGroup;
  guthis: any[] = [];
  guthiTypes: any[] = [];
  tenantTypes: any[] = [];
  filteredtenantTypes: any[] = [];
  userData: any;
  editData: any = null;
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private guthiService: GuthiService,
    private authService: AuthService,
    private loader:NgxUiLoaderService,
    private matRef: MatDialogRef<AddShrestaComponent>) { }
  ngOnInit(): void {
    this.shrestaForm = this.formBuilder.group({
      guthi_id: ['', Validators.required],
      guthi_type_id: ['', Validators.required],
      tenant_type_id: ['', Validators.required],
      tenant_name: ['', Validators.required],
      tenant_address: ['', Validators.required],
      tenant_mobile_no: ['', [
        Validators.required,
        Validators.pattern(/^9\d{9}$/)
      ]]
    });
    this.userData = this.authService.getUser();
    this.getGuthis();
  }
getGuthis(){
  this.loader.start();
  // console.log(id)
  this.guthiService.getAll({ table_name: "guthis" }).subscribe(
    { next:
    (res:any)=>{      
      this.guthis=res.data;
      console.log('guthi loaded');
      this.getGuthiTypes()
    },
    error: (err:any)=>{
      console.log(err)
    }
  }
  )
  this.loader.stop();
}

getGuthiTypes(){
  this.loader.start();
  // console.log(id)
  this.guthiService.getAll({ table_name: "guthi_type" }).subscribe(
    { next:
    (res:any)=>{      
      this.guthiTypes=res.data;
      console.log('guthi_type loaded');
      this.getTenantTypes()
    },
    error: (err:any)=>{
      console.log(err)
    }
  }
  )
  this.loader.stop();
}
getTenantTypes(){
  this.loader.start();
  // console.log(id)
  this.guthiService.getAll({ table_name: "tenant_type" }).subscribe(
    { next:
    (res:any)=>{      
      this.tenantTypes=res.data;
      console.log('tenant type loaded');
      if (this.aayekodata?.data?.id > 0) {
          this.loadEditData(this.aayekodata.data);
        }

    },
    error: (err:any)=>{
      console.log(err)
    }
  }
  )
  this.loader.stop();
}

filterTenantTypes() {
    const id = Number(this.shrestaForm.get('guthi_type_id')?.value);
    if (!id || !this.tenantTypes.length) return;

    this.filteredtenantTypes = this.tenantTypes.filter(
      (t: any) => Number(t.guthi_type_id) === id
    );
    console.log(this.filteredtenantTypes);
  }

  loadEditData(data: any) {
    console.log('foredit', data);
    this.shrestaForm.patchValue({
      guthi_id: data.guthi_id,
      guthi_type_id: data.guthi_type_id,
      tenant_name: data.tenant_name,
      tenant_address: data.tenant_address,
      tenant_mobile_no: data.tenant_mobile_no,
    });
    this.filterTenantTypes();

    this.shrestaForm.patchValue({
      tenant_type_id: data.tenant_type_id
    });


  }
  changeformat() {
    const control = this.shrestaForm.get('tenant_address');
    if (control) {
      const englishToNepaliMap: { [key: string]: string } = {
        '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
        '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
      };
      const originalValue = control.value || '';
      const convertedValue = originalValue.replace(/[0-9]/g, (d: string) => englishToNepaliMap[d]);

      // Only update if value changed to avoid flickering
      if (originalValue !== convertedValue) {
        control.setValue(convertedValue, { emitEvent: false }); // Avoid triggering valueChanges again
      }
    }
  }

  onSubmit() {
    try {
      const data = this.shrestaForm.value
      const newdata = { ...data, "officeid": this.userData.office_id, "userid": this.userData.id, "id": this.aayekodata.data.id }
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
