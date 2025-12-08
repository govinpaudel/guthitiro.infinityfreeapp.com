import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GuthiService } from '../../../services/guthi.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-monthlyreport',
  imports: [CommonModule,RouterLink],
  templateUrl: './monthlyreport.component.html',
  styleUrl: './monthlyreport.component.css'
})
export class MonthlyreportComponent implements OnInit {
  userData:any;
  reportData:any;
  constructor(private authService:AuthService,
    private guthiService:GuthiService
  ){}
  ngOnInit(): void {
  this.userData=this.authService.getUser();
  console.log(this.userData)
  this.loadReport(this.userData.office_id,this.userData.aaba_id)  
  }
  loadReport(office_id:any,aaba_id:any){
    this.guthiService.getmonthsum(office_id,aaba_id).subscribe(
      {
        next:(res:any)=>{
          this.reportData=res.data;
          console.log(res);
        },
        error:(err:any)=>{
          console.log(err)
        }
      }
    )
  }

}
