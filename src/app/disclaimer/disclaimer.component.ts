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

  /**
   * Used to alter some graphic descriptions of violence during some events
   */
  private is_censored: boolean = false;

  /**
   * @ignore
   */
  constructor() {
    if (sessionStorage.getItem('is_censored') === null) {
      this.is_censored = false;
    } else {
      this.is_censored = (sessionStorage.getItem('is_censored') === 'true');
    }
  }

  /**
   * Changes the value of the 'is_censored' variable to its opposite and update the session to reflect this change. Setter.
   */
  toggleCensor(): void {
    
    this.is_censored = !(this.is_censored);
    sessionStorage.setItem('is_censored', JSON.stringify(this.is_censored));

  }

  /**
   * Returns from the session the value of 'is_censored'. Getter.
   * @returns a boolean value regarding whether or not the censor has been activated.
   */
  getIs_censored(): Boolean {
    
    return (sessionStorage.getItem('is_censored') === 'true');
  
  }

}