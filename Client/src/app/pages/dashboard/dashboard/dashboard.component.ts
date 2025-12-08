import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material';
import { AuthService } from '../../../services/auth.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangepasswordComponent } from '../../user/changepassword/changepassword.component';


@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private matDailog: MatDialog
  ) { }
  ngOnInit(): void {
    this.userData = this.authService.getUser()
  }
  logout() {
    this.authService.logout()
  }
  changepassword() {
    let dailogref = this.matDailog.open(ChangepasswordComponent, {
      width: "400px",
      height: "380px"
    })
    dailogref.afterClosed().subscribe((item: any) => {
      if (item == true) {
        setTimeout(() => {
          this.authService.logout();
        }, 2000); // 2000 ms = 2 seconds
      }
    })
  }
}
