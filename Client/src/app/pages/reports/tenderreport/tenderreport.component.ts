import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material';
import { GuthiService } from '../../../services/guthi.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditTenderComponent } from '../edit-tender/edit-tender.component';

@Component({
  selector: 'app-tenderreport',
  imports: [MaterialModule, CommonModule],
  templateUrl: './tenderreport.component.html',
  styleUrl: './tenderreport.component.css'
})
export class TenderreportComponent {
  timer: any;
  reportData: any;
  constructor(
    private guthiService: GuthiService,
    private matDailog: MatDialog
  ) { }

  searchTender(e: Event) {
  clearTimeout(this.timer);

  const value = (e.target as HTMLInputElement).value;

  this.timer = setTimeout(() => {
    console.log(value);

    this.guthiService.getTenderByNo(value).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.reportData = res.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

  }, 500);
}

  showTenderForm(data: any) {
    this.matDailog.open(EditTenderComponent,{
      width: "600px",
      height: "500px",
      data: data}
    )
  }
}
