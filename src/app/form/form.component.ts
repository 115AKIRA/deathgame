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

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgFor, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatButtonModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

  /**
   * Internal name of the scenario selected to be edited in the form. Default value is 'termina'.
   */
  scenario_selected: string = "termina";


  /**
   * Data of the .json file used for the form. Default is 'termina.json'.
   */
  data: any = termina;

  /**
   * JS object used when the scenario selected is to make a new one. Default value is an empty object.
   */
  custom: any = {};

  /**
   * FormBuilder used for the form, to add new elements to the form.
   */
  private formBuilder: FormBuilder = inject(FormBuilder);

  /**
   * Variable used for the form itself.
   */
  form: FormGroup;

  /**
   * Used to determine which section of the form is visible. Can be changed using a Select input.
   */
  visible: string = "contestant";

  /**
   * Used for debug purposes, shows debug information.
   */
  debug: boolean = false;

  /**
   * Number of contestants in the form.
   */
  numberContestant: number = 0

  /**
   * Array containing the number of events in the form.
   * index = 0 : number of events (unused)
   * index = 1 : number of bloodbaths
   * index = 2 : number of days
   * index = 3 : number of specials
   */
  numberEvents: Array<number> = [0, 0, 0, 0];

  /**
   * Array containing the number of events inside the specials section
   */
  numberSpecials: Array<number> = [];

  /**
   * @ignore
   */
  constructor(private router: Router) {

    // SESSION CHECK
    if(!(sessionStorage.getItem('scenario') == null)) {
      this.custom = JSON.parse(String(sessionStorage.getItem('scenario')));
    } 

    if(!(sessionStorage.getItem('scenario_selected') == null)) {

      this.scenario_selected = this.getScenarioSelected() ?? "termina";

    }

    if(this.scenario_selected == "termina") {
      this.data = termina;
    } else if (this.scenario_selected == "copa") {
      this.data = copa;
    } else if (this.scenario_selected == "new") {
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

    //basic form
    this.form = this.formBuilder.group({
      name: [this.data.name],
      title: [this.data.title],
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

  }

  /**
   * Changes the scenario whose data will be used to fill the form. Used on the Select input.
   * @param {string} scenario_selected Internal name of the scenario selected
   */
  scenarioChange(scenario_selected: string): void {

    sessionStorage.setItem('scenario_selected', scenario_selected);
    window.location.reload();

  }

  /**
   * Gets from the session the scenario selected for the form. Getter
   * @returns {string} Internal name of the scenario selected
   */
  getScenarioSelected(): string {

    if (!(sessionStorage.getItem('scenario_selected') == null)) {
      return String(sessionStorage.getItem('scenario_selected')).replace(/"/g, '');
    } else {
      return "termina";
    }

  }

  /**
   * Checks to see if an scenario imported by the user exists
   * @returns True if a scenario imported by the user exists, false otherwise
   */
  isCustomScenarioExist(): boolean {

    return (!(this.custom == null));

  }

  /**
   * Toggles the 'debug' variable. 
   */
  toggleDebug(): void {
    this.debug = !this.debug;
  }

  /**
   * Used to see, as a string, the data behind the form. This data changes dynamically based on your input on the form.
   * @returns Value of the form cast as a string.
   */
  test(): string {
    return JSON.stringify(this.form.value);
  }

  /**
   * Get the 'contestants' Array from the form
   * @returns Contestants Array
   */
  get contestants(): FormArray {   
    return this.form.get('contestants') as FormArray;  
  }

  /**
   * Gets the contestant's personality (an Array) from the form, based on the index of the contestant on the form
   * @param index Index of the contestant on the form's array
   * @returns Personality Array
   */
  getPersonalityByIndex(index: number): FormArray {
    return this.contestants.at(index).get('personality') as FormArray;
  }

  /**
   * Get the 'events' Group from the form
   * @returns Events Group
   */
  get events() {
    return this.form.get('events') as FormGroup;
  }

  /**
   * Get the 'bloodbath' Array from the form
   * @returns Bloodbath Array
   */
  get bloodbath() { 
    return this.events.get('bloodbath') as FormArray;
  }

  /**
   * Get the 'day' Array from the form
   * @returns Day Array
   */
  get day() {   
    return this.events.get('day') as FormArray;
  }

  /**
   * Get the 'special' Array from the form
   * @returns Special Array
   */
  get special() {   
    return this.events.get('special') as FormArray;  
  }

   /**
   * Gets the 'special event' Array within the special array, based on the index of the special array on the form
   * @param index Index of the special on the form's array
   * @returns Special Event Array
   */
  getSpecEventFromIndex(index: number) {
    return this.special.at(index).get('events') as FormArray;
  }

  /**
   * Returns the name of one of the types of events based on its key
   * @param i Key of the type of event
   * @returns Value of the type of event
   */
  eventKey(i: number): string {
    switch(i) {
      case 0: return "bloodbath";
      case 1: return "day";
      case 2: return "special";
      default: return "?";
    }
  }

  /**
   * Add a contestant on the last index of the Contestant array on the form.
   * If data inside the JSON file provided for the form exists for the contestant, this data will be set on the form's input.
   * Else, the inputs will have a default value.
   * @param index Index of the contestant within the JSON file
   */
  addContestant(index: number): void {

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

  /**
   * Adds or remove multiple contestants. 
   * Checks for the total amount of contestants on the form's array before setting the amount of contestants on the array to
   * the number provided as parameter.
   * @param nb Number of contestants to be present on the contestants Array
   */
  addContestants(nb: number): void {

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

  /**
   * Removes a contestant from the form's array at the last index.
   */
  removeContestant() {    
    this.contestants.removeAt(this.contestants.length - 1);
  }

  /**
   * Removes a contestant from the form's array at the index specified.
   * @param index Index on the array relating to the contestant who should be removed.
   */
  removeContestantByIndex(index: number) {    
    this.contestants.removeAt(index);
    this.numberContestant -= 1;
  }

  /**
   * Add an event (bloodbath, day or special) on the last index of their respective array on the form.
   * If data inside the JSON file provided for the form exists for the events, this data will be set on the form's input.
   * Else, the inputs will have a default value.
   * @param index Index of the event within the JSON file
   * @param type Type of event (0: Bloodbath ; 1: Day ; 2: Special)
   */
  addEvent(index: number, type: number): void {

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

   /**
   * Adds or remove multiple events based on their type. 
   * Checks for the total amount of events of a certain type on the form's array before setting the amount of events on the array to
   * the number provided as parameter.
   * @param nb Number of events of a certain type to be present on their respective Array
   * @param type Type of event (0: Bloodbath ; 1: Day ; 2: Special)
   */
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

  /**
   * Removes a event based on its type from the form's array at the last index.
   * @param type Type of event (0: Bloodbath ; 1: Day ; 2: Special)
   */
  removeEvent(type: number): void {

    let eventKey = this.eventKey(type);

    if (eventKey == "special") {
      this.special.removeAt(this.special.length - 1);
    } else if (eventKey == "day") {
      this.day.removeAt(this.day.length - 1);
    } else if (eventKey == "bloodbath") {
      this.bloodbath.removeAt(this.bloodbath.length - 1);
    }

  }
  
  /**
   * Removes a event based on its type from the form's array at the index provided in parameters.
   * @param type Type of event (0: Bloodbath ; 1: Day ; 2: Special)
   * @param index Index on the array relating to the event of a certain type which should be removed.
   */
  removeEventByIndex(type: number, index: number): void {
    
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

  /**
   * Add an sub-event inside the 'special' array on the last index available for the sub-event in question.
   * If data inside the JSON file provided for the form exists for the sub-events, this data will be set on the form's input.
   * Else, the inputs will have a default value.
   * @param eventIndex Index of the special event this sub-event is the child of
   * @param index Index of the sub-event
   */
  addSpecialEvent(eventIndex: number, index: number): void {

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

  /**
   * Adds or remove multiple sub-events based on their index in the special array 
   * Checks for the total amount of sub-events on the form's array before setting the amount of events on the array to
   * the number provided as parameter.
   * @param eventIndex Index of the special event this sub-event is the child of
   * @param nb Number of sub-events to be present on the special event's Array
   */
  addSpecialEvents(eventIndex: number, nb: number): void {

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

  /**
   * Removes a sub-event based on its index in the specia array from the form's array at the last index.
   * @param eventIndex Index of the special event this sub-event is the child of.
   */
  removeSpecialEvent(eventIndex: number): void {

    this.getSpecEventFromIndex(eventIndex).removeAt(this.getSpecEventFromIndex(eventIndex).length - 1);

  }

  /**
   * Removes a sub-event based on its index in the specia array from the form's array at the index specified.
   * @param eventIndex Index of the special event this sub-event is the child of.
   * @param index Index of the sub-event within the special event
   */
  removeSpecialEventByIndex(eventIndex: number, index: number) {

    this.getSpecEventFromIndex(eventIndex).removeAt(index);

    this.numberSpecials[eventIndex] -= 1;

  }

  /**
   * If the form is valid, sets the form inside the session as 'scenario'.
   * If debuf is activated, will show debug information in the console.
   * Else, will redirect the user to the homepage.
   */
  onSubmit(): void {
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

  /**
   * Download the form as a JSON file.
   */
  saveScenario(): void {
    
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
