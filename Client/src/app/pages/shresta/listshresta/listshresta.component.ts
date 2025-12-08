import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddShrestaComponent } from '../addshresta/addshresta.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-shresta',
  imports: [MaterialModule, CommonModule],
  templateUrl: './listshresta.component.html',
  styleUrl: './listshresta.component.css'
})
export class ListShrestaComponent implements OnInit {
  userData: any;
  displayedColumns: string[] = ['guthi_type_name', 'guthi_name', 'tenant_type_name', 'tenant_name', 'tenant_address', 'tenant_mobile_no', 'view', 'rashid', 'edit', 'delete'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(private matDailog: MatDialog, private guthiService: GuthiService, private authService: AuthService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadUserData()
    this.loadShrestaData(this.userData.office_id)
  }

  loadUserData() {
    this.userData = this.authService.getUser()
  }

  loadShrestaData(office_id: any) {
    this.loader.start();
    this.guthiService.getAllShresta(office_id).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        console.log(res.data);
      }
    )
    this.loader.stop();
  }
  showShrestaAddEditForm(title: any, id: any) {
    let dialogRef = this.matDailog.open(AddShrestaComponent, {
      panelClass: 'custom-dialog-panel',
      height: '600px',
      width: '550px',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { title: title, id: id }
    });
    dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.loadShrestaData(this.userData.office_id)
      }
    })

  }
  delete(id: any) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewShrestaDetails(shresta_id: any,guthi_type_id:any) {
    console.log('shresta_id',shresta_id,'guthi_type_id',guthi_type_id);
    this.router.navigateByUrl('dashboard/viewshrestadetails', { state: { shresta_id: shresta_id,guthi_type_id:guthi_type_id } });
  }
  viewInvoiceDetails(shrestaid: any, guthi_type_id: any) {
    // console.log(shrestaid);
    this.router.navigateByUrl('dashboard/listinvoice', { state: { shrestaid: shrestaid, guthi_type_id: guthi_type_id } });
  }
}
