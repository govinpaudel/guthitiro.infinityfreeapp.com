import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialModule } from '../../../shared/material';
import { MatDialog } from '@angular/material/dialog';
import { EditVoucherComponent } from '../edit-voucher/edit-voucher.component';

@Component({
  selector: 'app-voucherreport',
  imports: [CommonModule,MaterialModule],
  templateUrl: './voucherreport.component.html',
  styleUrl: './voucherreport.component.css'
})
export class VoucherreportComponent implements OnInit {
  userData: any;
  voucherData:any[]=[];  
displayedColumns: string[] = [
  'sn',
  'office_name',
  'aaba_name',
  'edate',
  'ndate',
  'amount',
  'action'
];
  constructor(private authService: AuthService,
    private guthiService: GuthiService,
    private loader: NgxUiLoaderService,
    private dailog:MatDialog
  ) {

  }
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.getVouchers(this.userData.aaba_id,this.userData.office_id);
  }
   getVouchers(aaba_id:any,office_id:any) {
    this.loader.start();
    this.guthiService.getVouchers(aaba_id,office_id).subscribe(
      (res: any) => {
        this.voucherData = res.data;
        console.log('getStates', 'data', this.voucherData)
      }
    )
    this.loader.stop();
  }
  showAddEditForm(data:any){    
     let ref=this.dailog.open(EditVoucherComponent,{
          width: "500px",
          height: "450px",
          data: data}
        )
        ref.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getVouchers(this.userData.aaba_id,this.userData.office_id);
      }
    })
      }
  
}
