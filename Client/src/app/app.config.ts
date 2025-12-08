import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter,withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { apiInterceptor } from './services/api.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 60,
  fgsColor: '#007bff',
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withHashLocation()),
    provideAnimationsAsync(),        
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true
      })
    ),     
    provideToastr({closeButton:true}), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    importProvidersFrom(NgApexchartsModule),
    importProvidersFrom(
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
    ),    
  ]
};
