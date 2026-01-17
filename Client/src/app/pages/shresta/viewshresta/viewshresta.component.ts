import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddShrestaComponent } from '../addOrEditShresta/addshresta.component';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { AddLandComponent } from './addland/addland.component';
import { CommonModule, Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AreaToUnitsService } from '../../../services/area-to-units.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { DellandComponent } from '../delland/delland.component';


@Component({
  selector: 'app-viewshresta',
  imports: [MaterialModule, RouterLink, CommonModule],
  templateUrl: './viewshresta.component.html',
  styleUrl: './viewshresta.component.css'
})
export class ViewshrestaComponent implements OnInit {
  landData: any;
  aayekodata: any;
  totland: any;
  headerData:any=[];
  constructor(private route: ActivatedRoute,
    private areaToUnit: AreaToUnitsService,
    private guthiService: GuthiService,
    private matDailog: MatDialog,
    private location: Location,
    private loader: NgxUiLoaderService,
    private toaster: ToastrService,
    private router: Router,
  ) {
    this.aayekodata = location.getState();
  }
  ngOnInit(): void {
    console.log('shresta_id', this.aayekodata.shresta_id, 'guthi_type_id', this.aayekodata.guthi_type_id);
    this.getLandsByShrestaId(this.aayekodata.shresta_id);
    this.getOneShrestaById(this.aayekodata.shresta_id);

  }
  getOneShrestaById(id: any) {
    this.loader.start();
    this.loader.stop();
    this.guthiService.getOneShrestaById(id).subscribe(
      {
        next: (res: any) => {
          console.log("header Data",res.data[0]);
          this.headerData=res.data[0];          
        },
        error: (err: any) => {
          console.log(err)
        }
      }


    )
  }

  getLandsByShrestaId(id: any) {
    this.loader.start();
    this.guthiService.getLandsByShrestaId(id).subscribe(
      (res: any) => {
        this.landData = res.data;
        console.log('landdata', this.landData)
        let totalarea = this.landData.reduce((sum: any, item: any) => sum + (item.area_units || 0), 0);
        this.totland = this.areaToUnit.unitsToArea(this.landData[0].area_type_id, totalarea)
      }
    )
    this.loader.stop();
  }
  dupliland(id: any) {
    const dialogRef = this.matDailog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'जग्गा कपि गर्नुहोस्',
        message: 'के तपाई यही विवरण को नयाँ जग्गा थप गर्न चाहानु हुन्छ ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guthiService.dupliland(id).subscribe({
          next: (res: any) => {
            this.toaster.success(res.message);
            this.getLandsByShrestaId(this.aayekodata.shresta_id);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });
  }

  ShowAddLandForm(title: any, land: any) {
    let dialogRef = this.matDailog.open(AddLandComponent, {
      height: '450px',
      width: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { title: title, land: land,shresta:this.aayekodata}
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getLandsByShrestaId(this.aayekodata.shresta_id)
      }
    })
  }
  DeleteLand(id: any) {
    let dialogRef = this.matDailog.open(DellandComponent, {      
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: id
    });
    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getLandsByShrestaId(this.aayekodata.shresta_id)
      }
    })


    

  }
  showForm(title: any, id: any) {
    let dialogRef = this.matDailog.open(AddShrestaComponent, {
      // height: '600px',
      // width: '550px',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: id 
    });
    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getLandsByShrestaId(this.aayekodata.shresta_id)
      }
    })
  }

viewInvoiceDetails() {
    this.router.navigateByUrl('dashboard/listinvoice', { state: { shrestaid: this.aayekodata.shresta_id, guthi_type_id: this.aayekodata.guthi_type_id } });
  }

}
