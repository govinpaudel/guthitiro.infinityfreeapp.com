import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../material';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form-error',
  imports: [MaterialModule,CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
@Input() control!: AbstractControl | null;
@Input() label: string = 'यो क्षेत्र'; // default if not provided
}
