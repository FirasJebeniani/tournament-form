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
    'https://script.google.com/macros/s/AKfycbyjYr_g6dODSksFP_KrppTm53AYzN1rYgeIeFh8RvVeTq1npGM0KItccwUr57bpdAlH/exec';

  constructor(private http: HttpClient) { }
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
        // NOTE: Even with a successful save, you might see a "HttpErrorResponse"
        // if Google returns a redirect that HttpClient can't parse as JSON.
        console.error('Error!', error);

        // If your script definitely ran, you can still treat this as success
        if (error.status === 200 || error.status === 0) {
          this.submitted = true;
          registration.resetForm();
        }
      },
    });
  }
}

