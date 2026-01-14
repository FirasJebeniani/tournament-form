import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [FormsModule, NgIf],
  providers: [HttpClient],
  templateUrl: './form-container.html',
  styleUrls: ['./form-container.css'],
})
export class FormContainer {
  submitted = false;
  googleScriptURL =
    'https://script.google.com/macros/s/AKfycbz4KCGTHc5AFGkysy1EmbXZ_6Vm3NtyypEXLF7QgCZk9MfTA4-4g15ImYdAi9zKEj_l/exec';

  constructor(private http: HttpClient) { }
  currentStep = 1;

  nextStep(registration: NgForm) {
    if (registration.invalid) {
      registration.control.markAllAsTouched();
      return;
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }
  submit(registration: NgForm) {
    if (registration.invalid) {
      registration.control.markAllAsTouched();
      return;
    }

    const body = JSON.stringify(registration.value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain;charset=utf-8',
      }),
    };
    this.http.post(this.googleScriptURL, body, httpOptions).subscribe({
      next: (response) => {
        console.log('Success!', response);
        registration.resetForm();
        this.submitted = true;
      },
      error: (error) => {
        
        console.error('Error!', error);

        
        if (error.status === 200 || error.status === 0) {
          this.submitted = true;
          registration.resetForm();
        }
      },
    });
  }
}

