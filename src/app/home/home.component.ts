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

  public app = new AppComponent();

  private optionNames: Array<String> = ["Personality", "Relationship", "Transformation"];
  private options: number = 0b111; // 2^2 = transformations ; 2^1 = relationships ; 2^0 = personality ;

  public select: string = "termina"; //scenario de base

  public customName: string = "";

  public customScenario: Object;

  constructor(private router: Router) {

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

  test() {

    console.log(this.customScenario);

  }

  playGame() {

    this.router.navigateByUrl('/game');

  }

  isCustomScenarioExist() {

    return (!(this.customScenario == null));

  }

  getCustomScenario() {
    return this.customScenario;
  }

  getOptions(): Number {

    return Number(sessionStorage.getItem('options'));

  }

  getOption(option: number): Boolean {
    return Boolean(this.options & (0b1 << (option)));
  }

  getOptionWithName(option: String): Boolean {
    return this.getOption(this.optionNames.indexOf(option));
  }

  getOptionNames(): Array<String> {
    return this.optionNames;
  }

  setOption(option: number): void {
    this.options = (this.options ^ (0b1 << (option)));
    sessionStorage.setItem('options', JSON.stringify(this.options));
  }

  setOptionWithName(option: String): void {
    this.setOption(this.optionNames.indexOf(option));
  }

  getSelect(): String {

    return String(sessionStorage.getItem("scenario_selected")).replace(/"/g, '');

  }

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

  setSelect(select: string) {

    this.select = select;
    sessionStorage.setItem('scenario_selected', JSON.stringify(this.select));

  }
 

}