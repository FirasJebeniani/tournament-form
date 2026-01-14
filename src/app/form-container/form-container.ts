import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [FormsModule, NgIf],
  providers: [], // HttpClient est généralement fourni dans app.config.ts ou via provideHttpClient()
  templateUrl: './form-container.html',
  styleUrls: ['./form-container.css'],
})
export class FormContainer {
  submitted = false;
  googleScriptURL = 'https://script.google.com/macros/s/AKfycbzhCp9FG6_myCSMqsOsRi74QbHs8YyvWbVJfz2hiXvxWBUGznH8hB5wnFiadj-imisw/exec';

  constructor(private http: HttpClient) { }

  submit(registration: NgForm) {
    // 1. On vérifie si le formulaire est valide (champs obligatoires remplis)
    if (registration.invalid) {
      registration.control.markAllAsTouched();
      return;
    }

    // 2. Préparation des données
    const body = JSON.stringify(registration.value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain;charset=utf-8',
      }),
    };

    // 3. Envoi au Google Sheet
    this.http.post(this.googleScriptURL, body, httpOptions).subscribe({
      next: (response) => {
        console.log('Success!', response);
        this.finalizeSubmission(registration);
      },
      error: (error) => {
        // Gestion spécifique pour Google Apps Script (CORS/Redirect)
        if (error.status === 200 || error.status === 0) {
          console.log('Technical error but data likely sent:', error);
          this.finalizeSubmission(registration);
        } else {
          console.error('Real Error!', error);
          alert("An error occurred. Please try again.");
        }
      },
    });
  }

  // Fonction utilitaire pour éviter la répétition
  private finalizeSubmission(registration: NgForm) {
    registration.resetForm();
    this.submitted = true;
  }
}