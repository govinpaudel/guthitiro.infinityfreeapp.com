import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModule } from "../../../shared/material";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tender',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tender.component.html',
  styleUrl: './tender.component.css'
})
export class TenderComponent implements OnInit {
  tenderForm: any = FormGroup;
  tenders: any;
  today: any;
  userData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matdailogref: MatDialogRef<TenderComponent>
  ) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    console.log('utabata aayeko',this.data);
    this.tenderForm = this.formBuilder.group({
      date: ['', Validators.required],
      tender_type_id: ['', Validators.required],      
      tender_no: ['', Validators.required],
      amount: ['', Validators.required],
    }
    )
    this.getTenders();
    this.userData = this.authService.getUser();
    const totalAmount = this.data.reduce((sum: number, item: any) => sum + (item.final_amount || 0), 0);
    this.tenderForm.get('amount')?.setValue(totalAmount);    
  }
  onSubmit() {
    const formdata = this.tenderForm.value
    const newdata = { ...formdata, "office_id": this.userData.office_id, "user_id": this.userData.id, "aaba_id": this.userData.aaba_id,"data":this.data }
    console.log(newdata);     
      this.guthiService.saveTender(newdata).subscribe(
        {
          next: (res: any) => {
            if (res.status == true) {
              this.toaster.success(res.message);
              this.matdailogref.close(true);
            }
          },
          error: (err: any) => {
            console.log(err)
          }
        });
    
  }
  
  getTenders() {
    this.guthiService.getTenders().subscribe(
      {
        next: (res: any) => {
          this.tenders = res.data;
        }
        , error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
}
