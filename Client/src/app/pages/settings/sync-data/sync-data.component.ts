import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import {  ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sync-data',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './sync-data.component.html',
  styleUrl: './sync-data.component.css'
})
export class SyncDataComponent {
  dateForm: FormGroup;
  ipForm: FormGroup;
  sumData: any[] = [];
  downData: { table: string; count: number }[] = [];

  constructor(private fb: FormBuilder,
    private guthiservice: GuthiService,
    private toaster:ToastrService
  ) {
    this.dateForm = this.fb.group({
      date: ['', Validators.required]
    });

    this.ipForm = this.fb.group({
      ip: [
        '127.0.0.1',
        [
          Validators.required,
          Validators.pattern(
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/
          )
        ]
      ]
    });
  }

  submitDate() {
    const payload = {
      date: this.dateForm.value.date,
      tables: [
        'aabas',
        'area_type',
        'discounts',
        'districts',
        'gabisas',
        'guthi_type',
        'invoice_details',
        'invoice_header',
        'invoice_tender',
        'land_sub_type',
        'land_type',
        'months',
        'offices',
        'palikas',
        'palika_type',
        'rates_adhinasta',
        'rates_raitani',
        'shresta_details',
        'shresta_header',
        'states',
        'tenant_type',
        'tenders',
        'users',
        'wards',
        'vouchers'
      ]
    };

    this.guthiservice.downloadRecords(payload).subscribe({
      next: (res: any) => {
        this.sumData = res.data;   // ✅ store response
        console.log('Downloaded Data:', this.downData);
        this.downData = Object.keys(res.data).map(table => ({
          table,
          count: res.data[table].length
        }));
      },
      error: err => console.error(err)
    });
  }

  submitIP() {
    const data = {
      ipaddress: this.ipForm.value.ip,
      data: this.sumData
    }
    this.guthiservice.updateRecords(data).subscribe(
      {
      next: (res: any) => {        
       this.toaster.success(res.message, 'गुठी तिरो व्यवस्थापन प्रणाली');
        
      },
      error: (err:any) => {console.error(err)}
    }
    )
  }
}
