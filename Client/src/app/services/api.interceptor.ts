import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { HandleErrorService } from './handle-error.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const mytoken = sessionStorage.getItem('aToken');

  const errorhandler = inject(HandleErrorService)
  const clonerequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${mytoken}`
    }
  })
  return next(clonerequest).pipe(
    catchError((err: any) => {      
      if (err instanceof HttpErrorResponse) {        
          errorhandler.showError(err)       
      }        
      return throwError(() => err);
    }))
};
