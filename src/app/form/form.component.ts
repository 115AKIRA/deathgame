import { Component, ViewChild, ElementRef, inject, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, FormArray, FormsModule, AbstractControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

import { NgFor } from '@angular/common';

import * as termina from '../../../public/scenarios/termina.json';
import * as copa from '../../../public/scenarios/copa.json';

interface Scenario {

  name: String,
  title: String,
  contestants: {
    id: Number,
    name: String,
    image: String,
    personality: Array<String>
  },
  terminology: {
    
  }
    
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgFor, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatButtonModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

  scenario_chosen = "termina";

  data: any = termina;

  custom: any = {};

  readonly: Boolean = true;

  private formBuilder = inject(FormBuilder);

  form: FormGroup;

  visible: string = "contestant";

  debug: boolean = false;

  numberContestant: number = 0
  numberEvents: Array<number> = [0, 0, 0, 0];

  numberSpecials: Array<number> = [];

  constructor(private router: Router) {

    if(!(sessionStorage.getItem('scenario') == null)) {
      this.custom = JSON.parse(String(sessionStorage.getItem('scenario')));
    } 

    if(!(sessionStorage.getItem('scenario_chosen') == null)) {

      this.scenario_chosen = this.getScenarioChosen() ?? "termina";

    }

    if(this.scenario_chosen == "termina") {
      this.data = termina;
    } else if (this.scenario_chosen == "copa") {
      this.data = copa;
    } else if (this.scenario_chosen == "new") {
      this.data = this.custom;
    }

    if(!(this.data.contestants == null)) {
      this.numberContestant = this.data.contestants.length;
    }

    if(!(this.data.events == null)) {
      if(!(this.data.events.bloodbath == null)) {
        this.numberEvents[1] = this.data.events.bloodbath.length;
      }
      if (!(this.data.events.day == null)) {
        this.numberEvents[2] = this.data.events.day.length;
      }

      if (!(this.data.events.special == null)) {
        this.numberEvents[3] = this.data.events.special.length;
      }
    }

    this.form = this.formBuilder.group({
      name: [this.data.name],
      title: [this.data.title],
      /*
      contestants: this.formBuilder.group({
        street: [''],
        city: ['']
      }),
      */
      contestants: this.formBuilder.array([]),

      events: this.formBuilder.group({
        bloodbath: this.formBuilder.array([]),
        day: this.formBuilder.array([]),
        special: this.formBuilder.array([])
      })

    })

    this.addContestant(this.contestants.length);
    this.addContestants(this.numberContestant);

    this.addEvent(this.bloodbath.length, 0);
    this.addEvent(this.day.length, 1);
    this.addEvent(this.special.length, 2);

    this.addEvents(this.numberEvents[1], 0);
    this.addEvents(this.numberEvents[2], 1);
    this.addEvents(this.numberEvents[3], 2);

    /*

    for(let i: number = 0; i < this.data.events.special.length; i++ ) {
      if(this.numberSpecials[i] == null) {
        this.numberSpecials[i] = 0;
      }
      for(let j: number = 0; j < this.data.events.special[i].events.length; j++ ) {
        this.addSpecialEvent(i);
        this.numberSpecials[i] += 1;
      }
    }

    */

  }

  scenarioChange(scenario_chosen: string) {

    sessionStorage.setItem('scenario_chosen',scenario_chosen);
    window.location.reload();

  }

  getScenarioChosen() {

    if (!(sessionStorage.getItem('scenario_chosen') == null)) {
      return sessionStorage.getItem('scenario_chosen');
    } else {
      return "termina";
    }

  }

  isCustomScenarioExist() {

    return (!(this.custom == null));

  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  test() {
    return JSON.stringify(this.form.value);
  }

  updateProfile() {    
    this.form.patchValue({      
      name: 'Nancy',
    }); 
  }

  get contestants() {   
    return this.form.get('contestants') as FormArray;  
  }

  getPersonalityByIndex(index: number) {
    return this.contestants.at(index).get('personality') as FormArray;
  }

  get events() {
    return this.form.get('events') as FormGroup;
  }

  get bloodbath() { 
    return this.events.get('bloodbath') as FormArray;
  }

  get day() {   
    return this.events.get('day') as FormArray;
  }

  get special() {   
    return this.events.get('special') as FormArray;  
  }

  getSpecEventFromIndex(index: number) {
    return this.special.at(index).get('events') as FormArray;
  }


  eventKey(i: number) {
    switch(i) {
      case 0: return "bloodbath";
      case 1: return "day";
      case 2: return "special";
      default: return "?";
    }
  }

  eventKeyArray(i: number) {
    switch(i) {
      case 0: return this.bloodbath;
      case 1: return this.day;
      case 2: return this.special;
      default: return [];
    }
  }

  addContestant(index: number) {

    let id: string = '';
    let name: string = '';
    let image: string = '';
    let personality: Array<string> = ['0','0'];
    let pronouns: string = '';
    let friend: number = 0;
    let enemy: number = 0;
    let tr_name: string = '';
    let tr_image: string = '';
    let tr_personality: Array<string> = ['0','0'];

    if (!(this.data.contestants == null)) {
      if (!(this.data.contestants[index] == null)) {
        id = this.data.contestants[index].id ?? '';
        name = this.data.contestants[index].name ?? '';
        image = this.data.contestants[index].image ?? '';
        personality = this.data.contestants[index].personality ?? ['0','0'];
        pronouns = this.data.contestants[index].pronouns ?? '';
        friend = this.data.contestants[index].friend ?? 0;
        enemy = this.data.contestants[index].enemy ?? 0;

        if (!(this.data.contestants[index].transform) == null) {
          tr_name = this.data.contestants[index].transform.name ?? '';
          tr_image = this.data.contestants[index].transform.image ?? '';
          tr_personality = this.data.contestants[index].transform.personality ?? '';
        }
      }
    }
    
    const contestantForm = this.formBuilder.group({
      id: [id],
      name: [name],
      image: [image],
      personality: this.formBuilder.array([
        [personality[0]], [personality[1]]
      ]),
      pronouns: [pronouns],
      friend: [friend],
      enemy: [enemy],
      transform: this.formBuilder.group({
        name: [tr_name],
        image: [tr_image],
        personality: this.formBuilder.array([
          [tr_personality[0]], [tr_personality[1]]
        ])
      })
    })
    
    this.contestants.push(contestantForm);  
  }

  addContestants(nb: number) {

    let len = this.contestants.length;

    if (nb < len ) {
      while (nb < len) {
        this.removeContestant()
        nb++;
      }
    } else {
        while(nb > len) {
          this.addContestant(this.contestants.length);
          nb--;
        }
    } 

  }

  removeContestant() {    
    this.contestants.removeAt(this.contestants.length - 1);
  }

  removeContestantByIndex(index: number) {    
    this.contestants.removeAt(index);
    this.numberContestant -= 1;
  }

  addEvents(nb: number, type: number) {

    let eventKey = this.eventKey(type);

    let len = 0;

    if (eventKey == "special") {
      len = this.special.length;
    } else if (eventKey == "day") {
      len = this.day.length;
    } else if (eventKey == "bloodbath") {
      len = this.bloodbath.length;
    }
  
    if (nb < len ) {
      while (nb < len) {
        this.removeEvent(type)
        nb++;
      }
    } else {
        while(nb > len) {

          if (eventKey == "special") {
            this.addEvent(this.special.length, type);
          } else if (eventKey == "day") {
            this.addEvent(this.day.length, type);
          } else if (eventKey == "bloodbath") {
            this.addEvent(this.bloodbath.length, type);
          }
          nb--;
        }
    } 

  }

  addEvent(index: number, type: number) {

    let eventKey = this.eventKey(type);

    let special_name: string = '';
    let events: Array<string> = [''];

    let id: string = '';
    let description: string = '';
    let killer: string = '';
    let killed: string = '';
    let nb_actors: string = '';

    if (!(this.data.events == null)) {

      if ((eventKey == "special") && (!(this.data.events.special[index] == null))) {
        special_name = this.data.events.special[index].special_name ?? '';

        if (!(this.data.events.special[index].events == null)) {
          id = this.data.events.special[index].events[0] ?? '';
          description = this.data.events.special[index].events[1] ?? '';
          killer = this.data.events.special[index].events[2] ?? '';
          killed = this.data.events.special[index].events[3] ?? '';
          nb_actors = this.data.events.special[index].events[4] ?? '';
        }
    
      } else if ((eventKey == "day") && (!(this.data.events.day[index] == null))) {
        events = this.data.events.day[index];

        if (!(this.data.events.day[index] == null)) {
          id = this.data.events.day[index][0] ?? '';
          description = this.data.events.day[index][1] ?? '';
          killer = this.data.events.day[index][2] ?? '';
          killed = this.data.events.day[index][3] ?? '';
          nb_actors = this.data.events.day[index][4] ?? '';
        }

      } else if ((eventKey == "bloodbath") && (!(this.data.events.bloodbath[index ]== null))) {
        events = this.data.events.bloodbath[index];

        if (!(this.data.events.bloodbath[index] == null)) {
          id = this.data.events.bloodbath[index][0] ?? '';
          description = this.data.events.bloodbath[index][1] ?? '';
          killer = this.data.events.bloodbath[index][2] ?? '';
          killed = this.data.events.bloodbath[index][3] ?? '';
          nb_actors = this.data.events.bloodbath[index][4] ?? '';
        }
      }
    }

    if (eventKey == "special") {
      
      const specialForm = this.formBuilder.group({
          special_name: [special_name],
          events: this.formBuilder.array([])
      })

      this.special.push(specialForm);

      if (this.numberSpecials[index] == null) {
        this.numberSpecials[index] = 0;
      }

      if (!(this.data.events == null)) {
        if (this.data.events.special[index] == undefined) {
          this.addSpecialEvent(index, this.getSpecEventFromIndex(index).length);
        } else {
          for(let i: number = 0; i < this.data.events.special[index].events.length; i++) {
            this.addSpecialEvent(index, this.getSpecEventFromIndex(index).length);
          }
        }
      }

      this.numberSpecials[index] = this.getSpecEventFromIndex(index).length;

    } else if (eventKey == "day") {

      const dayForm = this.formBuilder.array([
        [id], [description], [killer], [killed], [nb_actors]
      ]);

      this.day.push(dayForm);

    } else if (eventKey == "bloodbath") {

      const bloodbathForm = this.formBuilder.array([
        [id], [description], [killer], [killed], [nb_actors]
      ]);

      this.bloodbath.push(bloodbathForm);

    }

  }

  removeEvent(type: number) {

    let eventKey = this.eventKey(type);

    if (eventKey == "special") {
      this.special.removeAt(this.special.length - 1);
    } else if (eventKey == "day") {
      this.day.removeAt(this.day.length - 1);
    } else if (eventKey == "bloodbath") {
      this.bloodbath.removeAt(this.bloodbath.length - 1);
    }

  }
  
  removeEventByIndex(type: number, index: number) {
    
    let eventKey = this.eventKey(type);

    if (eventKey == "special") {
      this.special.removeAt(index);
    } else if (eventKey == "day") {
      this.day.removeAt(index);
    } else if (eventKey == "bloodbath") {
      this.bloodbath.removeAt(index);
    }

    this.numberEvents[type + 1] -= 1;

  }

  addSpecialEvent(eventIndex: number, index: number) {

    let id: string = '';
    let description: string = '';
    let killer: string = '';
    let killed: string = '';
    let nb_actors: string = '';

    if (!(this.data.events == null)) {
      if (!(this.data.events.special == null)) {
        if (!(this.data.events.special[eventIndex] == undefined)) {
          if (!(this.data.events.special[eventIndex].events[index] == undefined)) {
            id = this.data.events.special[eventIndex].events[index][0] ?? '';
            description = this.data.events.special[eventIndex].events[index][1] ?? '';
            killer = this.data.events.special[eventIndex].events[index][2] ?? '';
            killed = this.data.events.special[eventIndex].events[index][3] ?? '';
            nb_actors = this.data.events.special[eventIndex].events[index][4] ?? '';
          }
        }
      }
    }
      
    const specialEventForm = this.formBuilder.array([
      [id], [description], [killer], [killed], [nb_actors]
    ]);

    this.getSpecEventFromIndex(eventIndex).push(specialEventForm);

  }

  addSpecialEvents(eventIndex: number, nb: number) {

    let len = this.getSpecEventFromIndex(eventIndex).length;

    if (nb < len ) {
      while (nb < len) {
        this.removeSpecialEvent(eventIndex);
        nb++;
      }
    } else {
        while(nb > len) {
          this.addSpecialEvent(eventIndex, this.getSpecEventFromIndex(eventIndex).length);
          nb--;
        }
    } 

  }

  removeSpecialEvent(eventIndex: number) {

    this.getSpecEventFromIndex(eventIndex).removeAt(this.getSpecEventFromIndex(eventIndex).length - 1);

  }

  removeSpecialEventByIndex(eventIndex: number, index: number) {

    this.getSpecEventFromIndex(eventIndex).removeAt(index);

    this.numberSpecials[eventIndex] -= 1;

  }

  onSubmit() {
    if (this.form.valid || 1) {
      sessionStorage.setItem('scenario', JSON.stringify(this.form.value));
      if(this.debug) {
        console.warn(sessionStorage.getItem('scenario'));
        console.warn(JSON.parse(String(sessionStorage.getItem('scenario'))));
        console.warn(this.form.value);
      } else {
        this.router.navigateByUrl('/home');
      }
    }
  }

  
  saveContestants() {
    
    const json = this.form.value;
    const blob = new Blob([JSON.stringify(this.form.value)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.data.name;
    link.click();
    window.URL.revokeObjectURL(url);
    
  }
  

}
