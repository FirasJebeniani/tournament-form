import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { FormContainer } from './form-container/form-container';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBar,
    FormContainer
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Projet ossec');
}
