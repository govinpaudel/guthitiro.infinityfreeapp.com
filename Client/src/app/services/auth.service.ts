import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = environment.apiUrl
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toaster: ToastrService
  ) { }
  login(data: any) {
    return this.httpClient.post(this.apiUrl + "/guthitiro/login", data,{responseType:'text'})
  }

  register(data: any) {
    return this.httpClient.post(this.apiUrl + "/guthitiro/register", data)
  }
  changepassword(data:any){
    return this.httpClient.post(this.apiUrl+"/guthitiro/changepassword",data)
  }

  logout() {
    sessionStorage.clear();
    this.toaster.success("सफलतापुर्वक लगआउट भयो ।", "गुठी तिरो व्यवस्थापन प्रणाली")
    this.router.navigate(['login']);
  }
  
  getUser() {
    const x = sessionStorage.getItem('userDetails');
    try {
      return x ? JSON.parse(x) : null;
    } catch (e) {
      console.error('Error parsing userDetails from sessionStorage:', e);
      return null;
    }
  }
  isLoggedIn(): boolean {
    if (!sessionStorage.getItem('userDetails')) {
      return false;
    }
    return true;
  }

  getAllOffices() {
    return this.httpClient.get(this.apiUrl + "/auth/getAllOffices")
  }

}
