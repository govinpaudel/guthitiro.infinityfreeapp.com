import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-tender',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-tender.component.html',
  styleUrl: './edit-tender.component.css'
})
export class EditTenderComponent implements OnInit {
  userData: any;
  data:any;
  tenderForm: any = FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public aayekodata: any,
    private formBuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matdailogref: MatDialogRef<EditTenderComponent>
  ) { }
  ngOnInit(): void {
    this.userData=this.authService.getUser()
    console.log(this.aayekodata);
    this.loadEditData(this.aayekodata)
    this.tenderForm = this.formBuilder.group({
      shresta_id: ['', Validators.required],
      aaba_id: ['', Validators.required],
      ndate: ['', Validators.required],      
      tender_no: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }
  loadEditData(id: any) {
    this.guthiService.getTenderById(this.aayekodata).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.tenderForm.get('shresta_id')?.setValue(res.data[0].shresta_id);
          this.tenderForm.get('aaba_id')?.setValue(res.data[0].aaba_id);
          this.tenderForm.get('ndate')?.setValue(res.data[0].ndate);
          this.tenderForm.get('tender_no')?.setValue(res.data[0].tender_no);
          this.tenderForm.get('amount')?.setValue(res.data[0].amount);
          this.data=res.data;
        },
        error: (err: any) => {
        }
      }
    )
  }
  onSubmit() {
    const formdata = this.tenderForm.value;
    const newdata = { ...formdata, "user_id": this.userData.id,"id":this.data[0].id }
    this.guthiService.updateTender(newdata).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          if(res.status=true){
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
