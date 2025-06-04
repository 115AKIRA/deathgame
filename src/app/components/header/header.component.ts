import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatCheckbox, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  /**
   * Checks if the user has accepted the disclaimer and has gone to the homepage once during this session
   * @returns true or false depending on if the user reached the homepage
   */
  hasBeenToHome(): boolean {

    return (!(sessionStorage.getItem('options') == null));

  }

  /**
   * Creates an iteration of the AppComponent class, used to access DisclaimerComponent's methods
   */
  public app = new AppComponent();

}
