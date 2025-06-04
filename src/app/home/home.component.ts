import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ScenarioComponent } from '../scenario/scenario.component';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatCheckboxModule, MatSelectModule, NgFor, HeaderComponent, FooterComponent, RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  /**
   * Creates an iteration of the AppComponent class, used to access DisclaimerComponent's methods
   */
  public app: AppComponent = new AppComponent();

  /**
   * Names of the options for the game in an array
   */
  private optionNames: Array<string> = ["Personality", "Relationship", "Transformation"];

  /**
   * Bitmap of the options selected for the game.
   * 2^2 = transformations ; 2^1 = relationships ; 2^0 = personality ;
   */
  private options: number = 0b111; // 2^2 = transformations ; 2^1 = relationships ; 2^0 = personality ;

  /**
   * Value of the Select input. Default is set to 'termina'.
   */
  public select: string = "termina";

  /**
   * Custom scenario to be exported and used in the game.
   * CURRENTLY UNIMPLEMENTED.
   */
  public customScenario: any;

  /**
   * @ignore
   */
  constructor(private router: Router) {

    //SESSION CHECK
    if (sessionStorage.getItem('options') == null) {
      this.options = 0b111;
      sessionStorage.setItem('options', JSON.stringify(this.options));
    } else {
      this.options = Number(sessionStorage.getItem('options'));
    }

    if (sessionStorage.getItem('scenario_selected') == null) {
      this.select = "termina";
      sessionStorage.setItem('scenario_selected', JSON.stringify(this.select));
    } else {
      this.select = String(sessionStorage.getItem("scenario_selected")).replace(/"/g, ''); 
      //dans la session, les string sont stocké avec des "" dont on les enleves
    }

    if(sessionStorage.getItem('scenario') == null) {
      this.customScenario = {};
    } else {
      this.customScenario = JSON.parse(String(sessionStorage.getItem('scenario')));
    }
  }

  /**
   * Test method to see the custom scenario, as an attempt to see how importing scenarions would work.
   */
  test(): void {

    console.log(this.customScenario);

  }

  /**
   * Redirects the user to the game's page.
   */
  playGame(): void {

    this.router.navigateByUrl('/game');

  }

  /**
   * Checks if an imported scenario has been initialized.
   * @returns True if an imported scenario exists, false otherwise.
   */
  isCustomScenarioExist(): boolean {

    return (!(this.customScenario == null));

  }

  /**
   * Getter of the custom scenario
   * @returns Value of the custom scenario
   */
  getCustomScenario(): any {
    return this.customScenario;
  }

  /**
   * Get the value of 'options' from the session.
   * @returns The bitmap options.
   */
  getOptions(): number {

    return Number(sessionStorage.getItem('options'));

  }

  /**
   * Uses bitwise operators to verify if a specific option in the bitmap options has been set to true or false.
   * @param option 2 = transformations ; 1 = relationships ; 0 = personality ;
   * @returns The value of the specific option
   */
  getOption(option: number): boolean {
    return Boolean(this.options & (0b1 << (option)));
  }

  /**
   * Gets all the names of the options.
   * @returns The array containing all the names of each option.
   */
  getOptionNames(): Array<string> {
    return this.optionNames;
  }

  /**
   * Uses bitwise operators to toggle a specific option to its opposite value in the bitmap options.
   * @param option 2 = transformations ; 1 = relationships ; 0 = personality ;
   */
  setOption(option: number): void {
    this.options = (this.options ^ (0b1 << (option)));
    sessionStorage.setItem('options', JSON.stringify(this.options));
  }

  /**
   * Get from the session the scenario selected
   * @returns Internal name of the scenario selected
   */
  getSelect(): string {

    return String(sessionStorage.getItem("scenario_selected")).replace(/"/g, '');

  }

  /**
   * Uses a string as a key to return an Int as a value, used to hide certain inputs on the page.
   * @returns Int value representing which scenario has been selected
   */
  getSelectAsInt(): number {

    if(this.select == 'termina') {
      return 0;
    } else if (this.select == 'copa') {
      return 1;
    } else if (this.select == 'import') {
      return 2;
    } else {
      return -1;
    }

  }

  /**
   * Set in the session the scenario selected
   * @param select Internal name of the scenario selected
   */
  setSelect(select: string): void {

    this.select = select;
    sessionStorage.setItem('scenario_selected', JSON.stringify(this.select));

  }
 

}