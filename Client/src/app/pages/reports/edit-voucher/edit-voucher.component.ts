import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { adToBs, bsToAd } from '@sbmdkl/nepali-date-converter';

@Component({
  selector: 'app-edit-voucher',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-voucher.component.html',
  styleUrl: './edit-voucher.component.css'
})
export class EditVoucherComponent implements OnInit {
  userData: any;  
  voucherForm: any = FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formBuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matdailogref: MatDialogRef<EditVoucherComponent>
  ) { }
  ngOnInit(): void {    
    this.voucherForm = this.formBuilder.group({      
      aaba_id: ['', Validators.required],
      ndate: ['', Validators.required],
      edate: ['', Validators.required],
      mon: ['', Validators.required],      
      amount: ['', Validators.required],
    })
    this.userData = this.authService.getUser()
    console.log(this.aayekodata);
    this.loadEditData(this.aayekodata)    
  }
  loadEditData(data:any){    
          this.voucherForm.get('aaba_id')?.setValue(data.aaba_id);
          this.voucherForm.get('ndate')?.setValue(data.ndate);
          this.voucherForm.get('edate')?.setValue(data.edate);
          this.voucherForm.get('mon')?.setValue(data.mon);          
          this.voucherForm.get('amount')?.setValue(data.amount);
  }
 changeDate() {
    const ndateValue = this.voucherForm.get('ndate')?.value;
    if (ndateValue) {
      const edateValue = bsToAd(ndateValue)
      this.voucherForm.patchValue({
        edate: edateValue,
        mon: ndateValue.split('-')[1]
      });
    }
  }
  onSubmit() {
    const formdata = this.voucherForm.value;
    const newdata = { ...formdata, "office_id": this.userData.office_id,"user_id": this.userData.id, "id": this.aayekodata.id }
    console.log(newdata);
    this.guthiService.updateVoucher(newdata).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          if (res.status = true) {
            this.toaster.success(res.message);
            this.matdailogref.close(true);
          }
        },
        error: (error: any) => {

        }
      }
    )
  }
}
