import { Component, OnInit, ViewChild } from '@angular/core';
import { GuthiService } from '../../../services/guthi.service';
import { MaterialModule } from '../../../shared/material';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddupdatesettingsComponent } from './addupdatesettings/addupdatesettings.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-localsettings',
  imports: [MaterialModule, CommonModule],
  templateUrl: './localsettings.component.html',
  styleUrl: './localsettings.component.css'
})
export class LocalsettingsComponent implements OnInit {
  displayedColumns: string[] = ['state_name', 'district_name', 'palika_type_name', 'palika_name', 'gabisa_name', 'edit'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private guthiService: GuthiService,
    private matDailog: MatDialog,
    private loader:NgxUiLoaderService
  ) { }
  ngOnInit(): void {
    this.getGabisas()
  }
  getGabisas() {
    this.loader.start();
    this.guthiService.getGabisas().subscribe(
      {
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {

        }
      }
    )
    this.loader.stop();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showEditForm(title: any, data: any) {
    let dialogRef = this.matDailog.open(AddupdatesettingsComponent, {
      height: '500px',
      width: '500px',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { title: title, data: data }
    });


dialogRef.afterClosed().subscribe((item: any) => {
      if (item == true) {
        this.getGabisas()
    }
  }
  )
  }

}
