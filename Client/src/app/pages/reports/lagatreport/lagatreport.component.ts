import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { RouterLink } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lagatreport',
  imports: [RouterLink],
  templateUrl: './lagatreport.component.html',
  styleUrl: './lagatreport.component.css'
})
export class LagatreportComponent implements OnInit {
  reportData:any;
  userData:any
  constructor(
    private guthiService:GuthiService,
    private authService:AuthService,
    private loader:NgxUiLoaderService
  ){}
  ngOnInit(): void {  
    this.userData=this.authService.getUser();
    console.log(this.userData)
    this.loadReport(this.userData.office_id)
  }
  loadReport(officeid:any){
    this.loader.start();
    this.guthiService.getLagatByOfficeId(officeid).subscribe(
      {next:(res:any)=>{
        this.reportData=res.data
        console.log(res.data);
      },
      error:(err:any)=>{
        console.log(err)
      },
      }
    )
    this.loader.stop();

  }
  exportToExcel(): void {
    this.loader.start();
    const element = document.getElementById('excel-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, 'exported_data');
    this.loader.stop();
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/octet-stream'
    });
    FileSaver.saveAs(data, `${fileName}_` + new Date().getTime() + '.xlsx');
  }

}
