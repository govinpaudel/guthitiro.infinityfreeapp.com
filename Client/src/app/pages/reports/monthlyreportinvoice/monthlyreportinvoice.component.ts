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
  public userData: any;
  public invoiceData: any;
  monthKeys = ['month4', 'month5', 'month6', 'month7', 'month8', 'month9', 'month10', 'month11', 'month12', 'month1', 'month2', 'month3'];
  monthNames = ['श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र', 'वैशाख', 'जेठ', 'असार'];
  filteredData: any[] = []; // Data to show for selected month
  selectedMonth: string = ''; // Currently selected monthKey

  // Called when month button is clicked
  selectMonth(monthKey: string) {
    this.selectedMonth = monthKey;
    this.filteredData = this.invoiceData[monthKey] || [];
  }
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.getmonthsuminvoice(this.userData.office_id, this.userData.aaba_id);
  }
  getmonthsuminvoice(id: any, id1: any) {
    this.loader.start()
    this.guthiService.getmonthsuminvoice(id, id1).subscribe(
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
}
