import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router=Inject(Router);
  const toaster=Inject(ToastrService)
  if (!sessionStorage.getItem('userDetails')) {   
    alert("कृपया कारोबार गर्न लगईन गर्नुहोला ।")
    return router.navigateByUrl('/login');
    return false;
  }
  return true;
}
