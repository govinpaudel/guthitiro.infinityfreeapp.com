import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material';
import { GuthiService } from '../../../../services/guthi.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable, map, startWith } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-addupdatesettings',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './addupdatesettings.component.html',
  styleUrl: './addupdatesettings.component.css'
})
export class AddupdatesettingsComponent {
  gabisaForm: any = FormGroup;
  states: any;
  districts: any;
  palika_types: any;
  palikas: any;
  userData: any;
  editData: any;
  palikaNameCtrl = new FormControl('', Validators.required);
  filteredPalikas!: Observable<any[]>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private guthiService: GuthiService,
    private authService: AuthService,
    private loader:NgxUiLoaderService,
    private matRef: MatDialogRef<AddupdatesettingsComponent>) { }
  ngOnInit(): void {
    this.gabisaForm = this.formBuilder.group({
      state_id: ['', Validators.required],
      district_id: ['', Validators.required],
      palika_type_id: ['', Validators.required],
      palika_id: ['', Validators.required],
      gabisa_name: [{ value: null, disabled: true }],
    })
    this.getStates()
    this.getDistricts()
    this.getPalikaTypes()
    this.getPalikas()
    this.getUserDetails()
    if (this.data.id > 0) {
      this.loadEditData(this.data.id)
    }
    this.filteredPalikas = this.palikaNameCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPalikas(value || ''))
    );
  }
  private _filterPalikas(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.palikas?.filter((p: any) =>
      p.palika_name.toLowerCase().includes(filterValue)
    );
  }

  onPalikaSelected(selectedName: string) {
    const selected = this.palikas.find((p: any) => p.palika_name === selectedName);
    if (selected) {
      this.gabisaForm.patchValue({ palika_id: selected.id });
    } else {
      this.gabisaForm.patchValue({ palika_id: null });
    }
  }

  loadEditData(id: any) {
    this.loader.start();
    this.guthiService.getGabisaById(id).subscribe(
      (res: any) => {
        this.editData = res.data;
        console.log(this.editData)
        const palikaId = this.editData[0].palika_id;
        const palikaObj = this.palikas?.find((p: any) => p.id === palikaId);
        this.palikaNameCtrl.setValue(palikaObj?.palika_name || '');
        this.gabisaForm.setValue({
          state_id: this.editData[0].state_id,
          district_id: this.editData[0].district_id,
          palika_type_id: this.editData[0].palika_type_id,
          palika_id: palikaId,
          gabisa_name: this.editData[0].gabisa_name
        })
      }
    )
    this.loader.stop();
  }
  getStates() {
    this.loader.start();
    this.guthiService.getStates().subscribe(
      (res: any) => {
        this.states = res.data
      }
    )
    this.loader.stop();
  }
  getDistricts() {
    this.loader.start();
    this.guthiService.getDistricts().subscribe(
      (res: any) => {
        this.districts = res.data
        // console.log(this.tenantTypes)
      }
    )
    this.loader.stop();
  }
  getPalikaTypes() {
    this.loader.start();
    this.guthiService.getPalikaTypes().subscribe(
      (res: any) => {
        this.palika_types = res.data
        // console.log(this.tenantTypes)
      }
    )
    this.loader.stop();
  }
  getPalikas() {
    this.loader.start();
    this.guthiService.getPalikas().subscribe(
      (res: any) => {
        this.palikas = res.data
        // console.log(this.tenantTypes)
      }
    )
    this.loader.stop();
  }

  getUserDetails() {
    this.userData = this.authService.getUser()
  }


  onSubmit() {
    this.loader.start();
    try {
      const data = this.gabisaForm.value
      const newdata = { ...data, "office_id": this.userData.office_id, "user_id": this.userData.id, "id": this.data.id }
      console.log(newdata);
      this.guthiService.addUpdateGabisa(newdata).subscribe(
        (res: any) => {
          this.toaster.success(res.message);
          this.matRef.close(true);
        }
      )
    } catch (error: any) {
      this.toaster.error(error.message, "guthiTiro")
    }
    this.loader.stop();
  }
}
