import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterLink } from '@angular/router';

import * as termina from '../../../public/scenarios/termina.json';
import * as copa from '../../../public/scenarios/copa.json';

@Component({
  selector: 'app-game',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  scenario: any;

  data: any;

  scenario_chosen: string = "termina";

  constructor() {

    if(!(sessionStorage.getItem('scenario_selected') == null)) {
      this.scenario_chosen = String(sessionStorage.getItem("scenario_selected")).replace(/"/g, '');
    }

    if(this.scenario_chosen = "termina") {
      this.data = termina;
    } else if (this.scenario_chosen = "copa") {
      this.data = copa;
    }

    sessionStorage.setItem("scenario", JSON.stringify(this.data));
    
    console.log(this.scenario_chosen);
    console.log(JSON.parse(String(JSON.stringify(this.data))));
    console.log(this.data);

  }

  test() {

    return String(JSON.stringify(this.data));

  }

  test2() {

    return String(JSON.stringify(sessionStorage));

  }

}
