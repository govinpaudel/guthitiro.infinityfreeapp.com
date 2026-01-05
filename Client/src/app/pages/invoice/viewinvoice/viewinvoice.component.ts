import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscountformComponent } from '../discountform/discountform.component';
import { CommonModule, Location } from '@angular/common';
import { TenderComponent } from '../tender/tender.component';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NumtowordsService } from '../../../services/numtowords.service';
import { AreaToUnitsService } from '../../../services/area-to-units.service';

@Component({
  selector: 'app-viewinvoice',
  imports: [CommonModule],
  templateUrl: './viewinvoice.component.html',
  styleUrl: './viewinvoice.component.css'
})
export class ViewinvoiceComponent implements OnInit {  
  aayekodata: any;
  shrestaid: any;
  invoiceid: any;
  headerData: any;
  detailsData: any;
  userData: any;
  currentDate = new Date();
  pendingData: any;
  summary: any = { total: 0, discount: 0, fine: 0, final: 0 }
  totinwords: any = 'जम्मा रकम';
  selectedIds = new Set<number>();
  SendingData:any;
  totArea:any;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private guthiService: GuthiService,
    private matDailog: MatDialog,
    private router: Router,
    private location: Location,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private ntw: NumtowordsService,
    private areaToUnit:AreaToUnitsService
  ) {
    this.aayekodata = location.getState()
  }
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.invoiceid = this.aayekodata.invoiceid
    this.shrestaid = this.aayekodata.shrestaid
    // console.log("aayeko data", this.aayekodata)
    this.loadInvHeaderData(this.invoiceid)
    this.loadInvDetailData(this.invoiceid)
    this.getPendingPaymentByShresta(this.shrestaid)
  }

  getPendingPaymentByShresta(shrestaid: any) {
    this.loader.start();
    this.guthiService.getPendingPaymentByShresta(shrestaid).subscribe(
      {
        next: (res: any) => {
          this.pendingData = res.data;
          console.log('pendingdata', res.data);
          this.doSummary()
        },
        error: (err: any) => {
          console.log(err);
        }

      })
    this.loader.stop();
  }
  doSummary = () => {
    this.summary.total = 0;
    this.summary.discount = 0;
    this.summary.fine = 0;
    this.summary.final = 0;
    this.pendingData.forEach((element: any) => {
      console.log(element);
      this.summary.total += element.invoice_amount
      this.summary.discount += element.discount_amount
      this.summary.fine += element.fine_amount
      this.summary.final += element.final_amount
    });
    this.totinwords = this.ntw.numToWords(this.summary.final)
  }
  loadInvHeaderData(id: any) {
    this.loader.start();
    this.guthiService.loadInvHeaderData(id).subscribe(
      (res: any) => {
        this.headerData = res.data
        console.log("header", this.headerData)
      }
    )
    this.loader.stop();
  }
  loadInvDetailData(id: any) {
    this.loader.start();
    this.guthiService.loadInvDetailData(id).subscribe(
      (res: any) => {
        this.detailsData = res.data
        console.log("details", this.detailsData)
        this.sumarea();
      }
    )
    this.loader.stop();
  }
  sumarea(){
    let totalarea = this.detailsData.reduce((sum: any, item: any) => sum + (item.area_units || 0), 0);
        this.totArea = this.areaToUnit.unitsToArea(this.detailsData[0].area_type_id, totalarea);
  }
  calulateRateAgain(invoice_id: any, shresta_id: any) {
    this.loader.start();
    const data={
      invoice_id:invoice_id,
      shresta_id:shresta_id
    }
    this.guthiService.updateRatesInInvoiceByid(data).subscribe(
      {
        next: (res: any) => {
          this.toaster.success(res.message);
          this.loadInvHeaderData(this.invoiceid)
          this.loadInvDetailData(this.invoiceid)
          this.getPendingPaymentByShresta(this.shrestaid)
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
    this.loader.stop();
  }

  showDiscountForm(invoice_Id: any,guthi_type_id:any) {
    let dailog = this.matDailog.open(DiscountformComponent, {
      width: "600px",
      data: { invoice_Id: invoice_Id,guthi_type_id:guthi_type_id }
    })
    dailog.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.loadInvHeaderData(this.invoiceid)
        this.loadInvDetailData(this.invoiceid)
        this.getPendingPaymentByShresta(this.shrestaid)
      }
    })
  }
  goBack() {
    this.router.navigateByUrl('dashboard/listinvoice', { state: { shrestaid: this.shrestaid } });
  }
  printInvoice() {
    window.print()
  }
  
  
  
  ShowTenderForm() {
    const selected = Array.from(this.selectedIds);
    if (selected.length === 0) {
      alert('कृपया कम्तिमा एउटा चयन गर्नुहोस्');
      return;
    }
    let matDailog = this.matDailog.open(TenderComponent, {
      width: "600px",
      height: "280px",
      data: this.SendingData
    })
    matDailog.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.loadInvHeaderData(this.invoiceid)
        this.loadInvDetailData(this.invoiceid)
        this.getPendingPaymentByShresta(this.shrestaid)
      }
    })
  }
 


  toggleSelection(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
    this.getSelectedData()
  }
  getSelectedData() {
  this.SendingData= this.pendingData.filter((item:any) => this.selectedIds.has(item.id));
}
}
