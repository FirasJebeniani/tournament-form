import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-container',
  standalone: true, 
  imports: [FormsModule, NgIf],
  templateUrl: './form-container.html',
  styleUrls: ['./form-container.css'],
})
export class FormContainer {
  submitted = false;
  constructor(private http: HttpClient) {}
  submit(registration: NgForm) {
  if (registration.invalid) {
    registration.control.markAllAsTouched();
    return;
  }
  // assume success
  this.submitted = true;
}



}
