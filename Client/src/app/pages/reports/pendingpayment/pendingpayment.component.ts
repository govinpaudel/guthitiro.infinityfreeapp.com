import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-pendingpayment',
  imports: [CommonModule],
  templateUrl: './pendingpayment.component.html',
  styleUrl: './pendingpayment.component.css'
})
export class PendingpaymentComponent implements OnInit {
  userData: any;
  reportData: any;
  constructor(
    private authService: AuthService,
    private guthiService: GuthiService,
    private loader: NgxUiLoaderService,
  ) {

  }
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.loadData(this.userData.office_id)

  }
  loadData(office_id: any) {
  console.log(office_id);
  this.loader.start(); // start loader

  this.guthiService.getPendingInvoicesByOfficeId(office_id).subscribe({
    next: (res:any) => {
      this.reportData=res.data;
      console.log(this.reportData);
    },
    error: (err) => {
      console.error('Error fetching invoices:', err);
    },
    complete: () => {
      this.loader.stop(); // stop loader when observable completes
    }
  });
}

}
