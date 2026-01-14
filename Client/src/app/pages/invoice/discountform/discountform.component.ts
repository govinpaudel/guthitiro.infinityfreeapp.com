import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material';
import { MatRadioChange } from '@angular/material/radio';
import { GuthiService } from '../../../services/guthi.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-discountform',
    imports: [MaterialModule],
    templateUrl: './discountform.component.html',
    styleUrl: './discountform.component.css'
})
export class DiscountformComponent implements OnInit {
invoice_id:any
guthi_type_id:any
alldiscounts:any;
filtereddiscounts:any;
selectedDiscount:any =0;
radioValue:any=0;
constructor(@Inject (MAT_DIALOG_DATA) public data:any,
private guthiService:GuthiService,
private toastService:ToastrService,
private matDailogRef:MatDialogRef<DiscountformComponent>){}
ngOnInit(): void {
  this.invoice_id=this.data.invoice_Id
  this.guthi_type_id=this.data.guthi_type_id
  this.loadDiscounts();
}
loadDiscounts(){
  const data={
    table_name:'discounts'
  }
  this.guthiService.getAll(data).subscribe(
    (res:any)=>{
      this.alldiscounts=res.data;      
    }
  ) 
}
changeRadio($event: MatRadioChange){
  this.radioValue=$event.value
  console.log($event.source.name, $event.value);
  this.loadDiscounts()
  const result = this.alldiscounts.filter(
    (list:any) => list.d_type==$event.value && list.guthi_type_id==this.guthi_type_id
  );
  this.filtereddiscounts=result;
}
changeDrop(e:any){
  this.selectedDiscount=e;
}

UpdateDiscount(){
  if(this.selectedDiscount>0){
  var data={
    invoiceid:this.invoice_id,
    radiovalue:this.radioValue,
    seldiscount:this.selectedDiscount
  }
  this.guthiService.updDiscounts(data).subscribe(
    (res:any)=>{
      this.toastService.success(res.message);
      this.matDailogRef.close(true);
    }
  )
}
else{
this.toastService.info("कृपया छुट वा जरिवाना छान्नुहोस् ।")
}
}

}
