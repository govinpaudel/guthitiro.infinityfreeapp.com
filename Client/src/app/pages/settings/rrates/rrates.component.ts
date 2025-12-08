import { Component, OnInit } from '@angular/core';
import { GuthiService } from '../../../services/guthi.service';
import { MaterialModule } from '../../../shared/material';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { AddrratesComponent } from './addrrates/addrrates.component';
import { UpdaterratesComponent } from './updaterrates/updaterrates.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
    selector: 'app-rates',
    imports: [MaterialModule],
    templateUrl: './rrates.component.html',
    styleUrl: './rrates.component.css'
})
export class RratesComponent implements OnInit {
  type:any=2;
  rates:any
  userData:any;
constructor(private guthiService:GuthiService,
  private authService:AuthService,
  private matDailog: MatDialog,
  private loader:NgxUiLoaderService
){}
ngOnInit(): void {
  this.userData=this.authService.getUser()  
  this.getRatesByOffice(this.userData.office_id,this.type)
}

getRatesByOffice(id:any,type:any){
  this.loader.start();
  // console.log(id)
  this.guthiService.getRatesByOffice(id,this.type).subscribe(
    { next:
    (res:any)=>{      
      this.rates=res.data
    },
    error: (err:any)=>{
      console.log(err)
    }
  }
  )
  this.loader.stop();
}
Delete(id:any){
  
}
AddRates(title: any, id:any) {
    let dialogRef = this.matDailog.open(AddrratesComponent, {
      height: '300px',
      width: '80%',
      maxWidth: '100vw',
      maxHeight:'100vh',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { title: title, id: id }
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
       this.getRatesByOffice(this.userData.office_id,this.type);
      }
    })
  }
  EditRates(title: any, id:any,guthi_type_id:any) {
    const data={ title: title, id: id,guthi_type_id:guthi_type_id };
    console.log('data for editing rates',data);
    let dialogRef = this.matDailog.open(UpdaterratesComponent, {
      height: '300px',
      width: '80%',
      maxWidth: '100vw',
      maxHeight:'100vh',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: data
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
       this.getRatesByOffice(this.userData.office_id,this.type);
      }
    })
  }
}
