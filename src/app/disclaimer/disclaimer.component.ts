import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-disclaimer',
  imports: [FormsModule, MatCheckboxModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent {

  private is_censored: boolean = false;

  constructor() {
    if (sessionStorage.getItem('is_censored') === null) {
      this.is_censored = false;
    } else {
      this.is_censored = (sessionStorage.getItem('is_censored') === 'true');
    }
  }

  toggleCensor(): void {
    
    this.is_censored = !(this.is_censored);
    sessionStorage.setItem('is_censored', JSON.stringify(this.is_censored));

  }

  getIs_censored(): Boolean {
    
    return this.is_censored;
  
  }

}