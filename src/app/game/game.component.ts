import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterLink } from '@angular/router';

import * as termina from '../../../public/scenarios/termina.json';
import * as copa from '../../../public/scenarios/copa.json';

@Component({
  selector: 'app-game',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  /**
   * Scenario to be set on the session
   */
  scenario: any;

  /**
   * Data of the .json file used for the form. Default is 'termina.json'.
   */
  data: any;

  /**
   * Internal name of the scenario selected to be used during the game. 
   * Default value is 'termina' if there's nothing in the session.
   */
  scenario_selected: string = "termina";

  /**
   * @ignore
   */
  constructor() {

    // SESSION CHECK
    if(!(sessionStorage.getItem('scenario_selected') == null)) {
      this.scenario_selected = String(sessionStorage.getItem("scenario_selected")).replace(/"/g, '');
    }

    if(this.scenario_selected = "termina") {
      this.data = termina;
    } else if (this.scenario_selected = "copa") {
      this.data = copa;
    }

    sessionStorage.setItem("scenario", JSON.stringify(this.data));

  }

  /**
   * Test method to show how the data from the JSON files looks as a string 
   * @returns String of the data selected for the game
   */
  test(): string {

    return String(JSON.stringify(this.data));

  }

  /**
   * Test method to show how the data from the session looks as a string 
   * @returns String of the session
   */
  test2(): string {

    return String(JSON.stringify(sessionStorage));

  }

}
