import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, MaterialModule, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService:AuthService){}
  logout(){
    this.authService.logout()
  }
}
