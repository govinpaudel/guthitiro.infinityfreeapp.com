import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MaterialModule, CommonModule,NgxUiLoaderModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GKMS';
}
