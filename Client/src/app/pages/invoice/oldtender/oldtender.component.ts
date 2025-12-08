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
  templateUrl: './oldtender.component.html',
  styleUrl: './oldtender.component.css'
})
export class oldTenderComponent implements OnInit {
  tenderForm: any = FormGroup;
  old_tenders: any;  
  userData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private guthiService: GuthiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private matdailogref: MatDialogRef<oldTenderComponent>
  ) {
    
  }
  ngOnInit(): void {
    console.log('utabata aayeko',this.data);
    this.tenderForm = this.formBuilder.group({
      aaba_id: ['', Validators.required],     
      ndate: ['', [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      tender_no: ['', Validators.required],     
      amount: ['', Validators.required]     
    }
    )
    this.getTenders();
    this.userData = this.authService.getUser();    
  }
  onSubmit() {
    const formdata = this.tenderForm.value
    const newdata = { ...formdata, "office_id": this.userData.office_id, "user_id": this.userData.id,"shresta_id":this.data }
    console.log(newdata);     
      this.guthiService.saveOldTender(newdata).subscribe(
        {
          next: (res: any) => {
            if (res.status == true) {
              this.toaster.success(res.message);
              this.getTenders();
              this.tenderForm.reset();
            }
          },
          error: (err: any) => {
            console.log(err)
          }
        });
    
  }
  
  getTenders() {
    this.guthiService.getOldTendersByShresta(this.data).subscribe(
      {
        next: (res: any) => {
          this.old_tenders = res.data;
        }
        , error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
}
