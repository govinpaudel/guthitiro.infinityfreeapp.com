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
  yearKeys:any[]=[];
  monthKeys:any[]= [];
  monthNames:any[] = [];
 
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
          this.populateYearAndMonths(this.invoiceData);
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
populateYearAndMonths(data: any[]) {

  // ---- YEARS (AABA) ----
  this.yearKeys = Array.from(
    new Set(data.map(item => String(item.aaba_id)))
  ).sort(); // optional sorting


  // ---- MONTHS (ORDERED) ----
  const monthMap = new Map<number, { mon: number; name: string }>();

  data.forEach(item => {
    if (!monthMap.has(item.month_order)) {
      monthMap.set(item.month_order, {
        mon: item.mon,
        name: item.month_name
      });
    }
  });

  // sort by fiscal month order (श्रावण → असार)
  const sortedMonths = Array.from(monthMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(entry => entry[1]);

  this.monthKeys  = sortedMonths.map(m => String(m.mon));
  this.monthNames = sortedMonths.map(m => m.name);
}
}
