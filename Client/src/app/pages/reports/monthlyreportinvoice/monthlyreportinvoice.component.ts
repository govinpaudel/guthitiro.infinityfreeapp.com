import { Component, OnInit } from '@angular/core';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monthlyreportinvoice',
  imports: [CommonModule],
  templateUrl: './monthlyreportinvoice.component.html',
  styleUrl: './monthlyreportinvoice.component.css'
})
export class MonthlyreportinvoiceComponent implements OnInit {
  constructor(
    private guthiService: GuthiService,
    private authService: AuthService,
    private loader: NgxUiLoaderService
  ) { }
  userData: any;
  invoiceData: any;
  filteredData: any[] = [];
  yearKeys=['7071','7172','7273','7374','7475','7576','7677','7778','7879','7980','8081','8182','8283']
  monthKeys = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3'];
  monthNames = ['श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र', 'वैशाख', 'जेठ', 'असार'];
 
  selectedMonth: string = '';
  selectedYear: string ='';

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.getmonthsuminvoice(this.userData.office_id);
  }
  getmonthsuminvoice(id: any) {
    this.loader.start()
    this.guthiService.getmonthsuminvoice(id).subscribe(
      {
        next: (res: any) => {
          this.invoiceData = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
    this.loader.stop()
  }
  getTotalAmount(): number {
    return this.filteredData.reduce((sum, invoice) => sum + invoice.amount, 0);
  }
 
  selectMonth(monthKey: string) {
    this.selectedMonth = monthKey;
    if (!this.selectedYear) return;    

    this.filteredData = this.invoiceData.filter((item:any) =>
      String(item.aaba_id) === this.selectedYear &&
      String(item.mon) === monthKey
    );
    
  }

  
  selectYear(yearKey: string) {
    this.selectedYear = yearKey;
    this.selectedMonth = '';

    this.filteredData = this.invoiceData.filter((item:any) =>
      String(item.aaba_id) === yearKey
    );
  }

}
