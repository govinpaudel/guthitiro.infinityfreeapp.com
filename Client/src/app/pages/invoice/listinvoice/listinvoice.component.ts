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

@Component({
    selector: 'app-invoice',
    imports: [MaterialModule, CommonModule, RouterLink],
    templateUrl: './listinvoice.component.html',
    styleUrl: './listinvoice.component.css'
})
export class ListInvoiceComponent implements OnInit{
  aayekodata:any;
  shrestaid:any;
  guthi_type_id:any;
  invoiceData:any;
  constructor(private route: ActivatedRoute,
    private guthiService:GuthiService,
    private matDailog:MatDialog,
    private location:Location,
    private router:Router,
    private loader:NgxUiLoaderService
  ){
    this.aayekodata = location.getState();
    console.log(this.aayekodata);
    this.shrestaid = this.aayekodata.shrestaid
    this.guthi_type_id=this.aayekodata.guthi_type_id
  }
  ngOnInit(): void {    
    this.getInvoicesByShresta(this.shrestaid)  
}
getInvoicesByShresta(id:any){
  this.loader.start();
this.guthiService.getInvoicesByShresta(id).subscribe(
  (res:any)=>{
    this.invoiceData=res.data;    
  }
)
this.loader.stop();
}

gen_invoice(){
  const data={
      shresta_id:this.shrestaid,
      guthi_type_id:this.guthi_type_id
  }
  console.log('gen invoice data',data)
  let matDailog=this.matDailog.open(GenInvoiceComponent,{
    width:"600px",
    height:"200px",
    data:data
  })
  matDailog.afterClosed().subscribe((item:any) => {      
    if(item==true){        
      this.getInvoicesByShresta(this.shrestaid)
    }      
  })
}
viewInvoiceDetails(invoiceid: any) {
  // console.log("invoiceid",invoiceid);
  this.router.navigateByUrl('dashboard/viewinvoicedetails', { state: { invoiceid: invoiceid,shrestaid:this.shrestaid } });
}

ShowOldTenderForm() {    
    let matDailog = this.matDailog.open(oldTenderComponent, {
     maxWidth: '100vw',
  maxHeight: '100vh',
  width: '100vw',
  height: '100vh',
      data: this.shrestaid
    })
    matDailog.afterClosed().subscribe((item: any) => {
      if (item == true) {        
      }
    })
  }


}
