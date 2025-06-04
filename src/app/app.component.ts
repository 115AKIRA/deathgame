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

  /**
   * Title of the app in the web browser
   */
  title: string = 'deathgame';

  /**
   * Creates an iteration of the DisclaimerComponent class, used to access its methods
   */
  disclaimer = new DisclaimerComponent;


  /**
   * @ignore
   */
  constructor() {}

}