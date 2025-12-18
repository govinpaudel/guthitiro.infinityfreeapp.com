import { Routes } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/user/register/register.component';
import { ListInvoiceComponent } from './pages/invoice/listinvoice/listinvoice.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { DashdataComponent } from './pages/dashboard/dashdata/dashdata.component';
import { ViewinvoiceComponent } from './pages/invoice/viewinvoice/viewinvoice.component';
import { ViewshrestaComponent } from './pages/shresta/viewshresta/viewshresta.component';
import { ListShrestaComponent } from './pages/shresta/listshresta/listshresta.component';
import { ReportDashComponent } from './pages/reports/report-dash/report-dash.component';
import { LocalsettingsComponent } from './pages/settings/localsettings/localsettings.component';
import {AratesComponent} from './pages/settings/arates/arates.component';
import { RratesComponent } from './pages/settings/rrates/rrates.component';
import { DiscountsComponent } from './pages/settings/discounts/discounts.component';
import { LagatreportComponent } from './pages/reports/lagatreport/lagatreport.component';
import { InvoicereportComponent } from './pages/reports/invoicereport/invoicereport.component';
import { MonthlyreportComponent } from './pages/reports/monthlyreport/monthlyreport.component';
import { TenderreportComponent } from './pages/reports/tenderreport/tenderreport.component';
import { SearchbykittaComponent } from './pages/reports/searchbykitta/searchbykitta.component';
import { MonthlyreportinvoiceComponent } from './pages/reports/monthlyreportinvoice/monthlyreportinvoice.component';
import { SyncDataComponent } from './pages/settings/sync-data/sync-data.component';

export const routes: Routes = [
    {path:"",title:"GKMS | लगईन गर्नुहोस्",redirectTo:'login',pathMatch:'full'},
    {path:"login",title:"GKMS | लगईन गर्नुहोस्",component:LoginComponent},
    {path:"register",title:"GKMS | नयाँ प्रयोगकर्ता",component:RegisterComponent},    
    {path:"dashboard",title:"GKMS | गृहपृष्ठ",component:DashboardComponent,canActivate:[authGuard],canActivateChild:[authGuard],
        children:[
            {path:"",title:"GKMS | गृहपृष्ठ",component:DashdataComponent},
            {path:"dashdata",title:"GKMS | गृहपृष्ठ",component:DashdataComponent},
            {path:"listshresta",title:"GKMS | श्रेष्ता",component:ListShrestaComponent},
            {path:"viewshrestadetails",title:"GKMS | श्रेष्ता विवरण",component:ViewshrestaComponent},
            {path:"listinvoice",title:"GKMS | रसिद",component:ListInvoiceComponent},
            {path:"viewinvoicedetails",title:"GKMS । विवरण",component:ViewinvoiceComponent},
            {path:"raitanirates",title:"GKMS | दरहरु",component:RratesComponent},
            {path:"adhinastarates",title:"GKMS | दरहरु",component:AratesComponent},
            {path:"discounts",title:"GKMS | छुटहरु",component:DiscountsComponent},
            {path:"locals",title:"GKMS | स्थानिय तहहरु",component:LocalsettingsComponent},
            {path:"syncdata",title:"GKMS | डाटा सिङ्क",component:SyncDataComponent},
            {path:"reports",title:"GKMS | रिपोर्ट",component:ReportDashComponent},
            {path:"lagatreport",title:"GKMS | रिपोर्ट",component:LagatreportComponent},
            {path:"invoicereport",title:"GKMS | रिपोर्ट",component:InvoicereportComponent},
            {path:"monthlyreportinvoice",title:"GKMS | रिपोर्ट",component:MonthlyreportinvoiceComponent},
            {path:"monthlyreport",title:"GKMS | रिपोर्ट",component:MonthlyreportComponent},
            {path:'tenderreport',title:"GKMS । टेन्डर रिपोर्ट",component:TenderreportComponent},
            {path:'searchbykitta',title:"GKMS । कित्ता खोजी",component:SearchbykittaComponent}
        ]
    },
];
