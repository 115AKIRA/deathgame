import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { DisclaimerComponent } from "./disclaimer/disclaimer.component";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'deathgame';

  disclaimer = new DisclaimerComponent;

  constructor() {

  }

}