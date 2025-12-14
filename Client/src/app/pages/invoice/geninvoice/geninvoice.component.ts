import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { adToBs, bsToAd } from '@sbmdkl/nepali-date-converter';

@Component({
  selector: 'app-geninvoice',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './geninvoice.component.html',
  styleUrls: ['./geninvoice.component.css']
})
export class GenInvoiceComponent implements OnInit {
  genForm!: FormGroup;
  aabas: any[] = [];
  userDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private guthiService: GuthiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private matDialogRef: MatDialogRef<GenInvoiceComponent>
  ) {}

  ngOnInit(): void {
    this.genForm = this.formBuilder.group({
      aaba_id: ['', Validators.required]
    });

    this.loadAabas();

    const user = this.authService.getUser();
    this.userDetails = typeof user === 'string' ? JSON.parse(user) : user;
    console.log(this.userDetails);
  }

  loadAabas(): void {
    this.guthiService.getAabas().subscribe((res: any) => {
      this.aabas = res.data || [];

      const currentAaba = this.aabas.find((aaba: any) => aaba.is_current == 1);
      if (currentAaba) {
        this.genForm.get('aaba_id')?.setValue(currentAaba.id);
        // Optional: mark form as dirty if you still want dirty-based checks
        // this.genForm.markAsDirty();
      }
    });
  }

  submitForm(): void {
    if (this.genForm.invalid) {
      this.toaster.error("कृपया आवश्यक फिल्डहरू भर्नुहोस्", "Error");
      return;
    }
    const formdata = this.genForm.value;
    const todayAd = new Date(); 
    const adString = todayAd.toISOString().split('T')[0];
    const todayBs = adToBs(adString);
    const parts = todayBs.split('-');
    const todayMon = parts[1];    
    const newdata = {
      ...formdata,
      shresta_id: this.data.shresta_id,
      user_id: this.userDetails.id,
      office_id: this.userDetails.office_id,
      state_id: this.userDetails.state_id,
      district_id: this.userDetails.district_id,
      invoice_aaba_id: this.userDetails.aaba_id,
      guthi_type_id: this.data.guthi_type_id,
      todayAd:adString,
      todayBs:todayBs,
      todayMon:todayMon
    };

    console.log(newdata);

    this.guthiService.genInvoice(newdata).subscribe((res: any) => {
      this.toaster.info(res.message, "गुठी तिरो व्यवस्थापन प्रणाली");
      this.matDialogRef.close(true);
    });
  }
}
