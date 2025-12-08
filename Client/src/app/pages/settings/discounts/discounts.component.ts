import { Component,OnInit } from '@angular/core';
import { GuthiService } from '../../../services/guthi.service';



@Component({
  selector: 'app-discounts',
  standalone: true, // Only if you're using standalone components
  imports: [],
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {  
  discountData:any;
  constructor( private guthiService: GuthiService,   
  ) {}

  ngOnInit(): void {   
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.guthiService.getFineOrDiscounts().subscribe((res: any) => {
      this.discountData = res.data;
      console.log(this.discountData);
    });
  }

}
