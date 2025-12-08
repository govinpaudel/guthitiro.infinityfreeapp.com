import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  constructor(private router:Router,
    private toaster:ToastrService
  ) { }
  showError(error:any){
    if(error.status==401) {
      // console.log("error",error);
      // this.toaster.warning(error.statusText)
  }
  else if(error.status==500){
    // console.log('',error);
    this.toaster.warning(error.error?.message)
    this.router.navigate(['login'])
  }
}
}

