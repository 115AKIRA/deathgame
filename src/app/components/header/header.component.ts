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

  hasBeenToHome() {

    return (!(sessionStorage.getItem('options') == null));

  }

  public app = new AppComponent();

}
