import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GuthiService } from '../../../services/guthi.service';
import { MatDialog } from '@angular/material/dialog';
import { GenInvoiceComponent } from '../geninvoice/geninvoice.component';
import { TenderComponent } from '../tender/tender.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { oldTenderComponent } from '../oldtender/oldtender.component';
import { EditTenderComponent } from '../../reports/edit-tender/edit-tender.component';

@Component({
  selector: 'app-invoice',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './listinvoice.component.html',
  styleUrl: './listinvoice.component.css'
})
export class ListInvoiceComponent implements OnInit {
  aayekodata: any;
  shrestaid: any;
  guthi_type_id: any;
  invoiceData: any;
  tenderData: any;
  constructor(private route: ActivatedRoute,
    private guthiService: GuthiService,
    private matDailog: MatDialog,
    private location: Location,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {
    this.aayekodata = location.getState();
    console.log(this.aayekodata);
    this.shrestaid = this.aayekodata.shrestaid
    this.guthi_type_id = this.aayekodata.guthi_type_id
  }
  ngOnInit(): void {
    this.getInvoicesByShrestaId(this.shrestaid)
    this.getOldTendersByShrestaId(this.shrestaid)
  }
  getInvoicesByShrestaId(id: any) {
    this.loader.start();
    this.guthiService.getInvoicesByShrestaId(id).subscribe(
      (res: any) => {
        this.invoiceData = res.data;
      }
    )
    this.loader.stop();
  }
  getOldTendersByShrestaId(id: any) {
    this.guthiService.getOldTendersByShrestaId(id).subscribe(
      {
        next: (res: any) => {
          this.tenderData = res.data;
        }
        , error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

  gen_invoice() {
    const data = {
      shresta_id: this.shrestaid,
      guthi_type_id: this.guthi_type_id
    }
    console.log('gen invoice data', data)
    let matDailog = this.matDailog.open(GenInvoiceComponent, {
      width: "600px",
      height: "200px",
      data: data
    })
    matDailog.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getInvoicesByShrestaId(this.shrestaid)
      }
    })
  }
  viewInvoiceDetails(invoiceid: any) {
    // console.log("invoiceid",invoiceid);
    this.router.navigateByUrl('dashboard/viewinvoicedetails', { state: { invoiceid: invoiceid, shrestaid: this.shrestaid } });
  }

  ShowOldTenderForm() {
    let matDailog = this.matDailog.open(oldTenderComponent, {
      width: '600px',
      height: '380px',
      data: this.shrestaid
    })
    matDailog.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getInvoicesByShrestaId(this.shrestaid)
        this.getOldTendersByShrestaId(this.shrestaid)
      }
    })
  }

  showTenderForm(data: any) {
    let matDailog = this.matDailog.open(EditTenderComponent, {
      width: "600px",
      height: "500px",
      data: data
    })
    matDailog.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getInvoicesByShrestaId(this.shrestaid)
        this.getOldTendersByShrestaId(this.shrestaid)
      }
    })
  }


}
