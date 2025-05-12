import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ScenarioComponent } from '../scenario/scenario.component';
import { AppComponent } from '../app.component';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatCheckboxModule, MatSelectModule, NgFor, HeaderComponent, FooterComponent, ScenarioComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public app = new AppComponent;

  private optionNames: Array<String> = ["Personality", "Relationship", "Transformation"];
  private options: number = 0b111; // 2^2 = transformations ; 2^1 = relationships ; 2^0 = personality ;

  public select: String = "termina"; //scenario de base

  constructor() {
    if (sessionStorage.getItem('options') == null) {
      this.options = 0b111;
    } else {
      this.options = Number(sessionStorage.getItem('options'));
    }

    if (sessionStorage.getItem('scenario') == null) {
      this.select = "termina";
    } else {
      this.select = String(sessionStorage.getItem("scenario")).replace(/"/g, ''); 
      //dans la session, les string sont stocké avec des "" dont on les enleves
    }
  }

  getOptions(): Number {

    return this.options;

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
    return this.select;
  }

  setSelect(select: String): void {
    this.select = select;
    sessionStorage.setItem('scenario', JSON.stringify(this.select));
  }

}
