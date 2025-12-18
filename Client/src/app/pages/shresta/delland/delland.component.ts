import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuthiService } from '../../../services/guthi.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delland',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './delland.component.html',
  styleUrl: './delland.component.css'
})
export class DellandComponent {
  delform: any = FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private guthiservice: GuthiService,
    private toast: ToastrService,
    private matdailogref:MatDialogRef<DellandComponent>
  
  ) {
    this.delform = this.fb.group({
      remarks: ['', Validators.required]
    });
  }
  submitDelete() {
    const confirmDelete = confirm('के तपाई डिलिट गर्न चाहानु हुन्छ ?');
    if (!confirmDelete) {
      return;
    }
    const formdata = this.delform.getRawValue();
    const newdata = { ...formdata, id: this.data }
    this.guthiservice.deleteLand(newdata).subscribe({
      next: (res: any) => {
        this.toast.success(res.message, 'गुठी व्यवस्थापन प्रणाली');
        this.matdailogref.close(true);

      },
      error: (err: any) => {
        console.log(err);
      }

    }
    )




  }

}
