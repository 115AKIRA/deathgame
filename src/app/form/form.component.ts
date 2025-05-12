import { Component, ViewChild, ElementRef, inject, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, FormArray, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { NgFor } from '@angular/common';

import * as termina from '../../../public/scenarios/termina.json';

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
  imports: [ReactiveFormsModule, NgFor, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

  data: any = termina;

  readonly: Boolean = true;

  private formBuilder = inject(FormBuilder);

  form: FormGroup;

  numberContestant: number = this.data.contestants.length;
  numberEvents: Array<number> = [this.data.events.length, this.data.events.bloodbath.length, 
    this.data.events.day.length, this.data.events.special.length];

  constructor() {

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
      events: this.formBuilder.array([]),

      /*
      bloodbath: this.data.events.formBuilder.array([]),
      special: this.data.events.formBuilder.array([]),
      day: this.data.events.formBuilder.array([]),
      */
    })

    this.addContestant(this.contestants.length);
    this.addContestants(this.numberContestant);

    this.addEvent(this.events.length);
    this.addEvents(this.numberEvents[0]);

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

  get events() {   
    return this.form.get('events') as FormArray;  
  }

  /*

  get day() {   
    return this.events.get('day') as FormArray;  
  }

  get special() {   
    return this.events.get('special') as FormArray;  
  }

  */

  eventKey(i: number) {
    switch(i) {
      case 0: return "bloodbath";
      case 1: return "day";
      case 2: return "special";
      default: return "?";
    }
  }

  addContestant(index: number) {

    let id: string;
    let name: string;
    let image: string;
    let personality: Array<string>;
    let pronouns: string;

    if (this.data.contestants[index] == null) {
      id = '';
      name= '';
      image= '';
      personality= [''];
      pronouns= '';
    } else {
      id = this.data.contestants[index].id;
      name = this.data.contestants[index].name;
      image = this.data.contestants[index].image;
      personality = this.data.contestants[index].personality;
      pronouns = this.data.contestants[index].pronouns;
    }
    
    const contestantForm = this.formBuilder.group({
      id: [id],
      name: [name],
      image: [image],
      personality: [personality],
      pronouns: [pronouns]
    })
    
    this.contestants.push(contestantForm);  
  }

  addEvent(index: number) {

    let bloodbath: Array<Array<string>>;
    let day: Array<Array<string>>;
    let special: Array<Array<string>>;

    if (this.data.events[index] == null) {

      bloodbath = this.data.events.bloodbath;
      day = this.data.events.day;
      special = this.data.events.special;

    } else {

      bloodbath = [['']];
      day = [['']];
      special = [['']];

    }

    const eventForm = this.formBuilder.group({
      bloodbath: [bloodbath],
      day: [day],
      special: [special]
    })

    this.events.push(eventForm);

  }

  get bloodbath() {   
    return this.form.get('events')?.get('bloodbath') as FormArray;  
  }

  addBloobath(index: number) {

    let scene: Array<string>;

    if(this.data.events.bloodbath[index] == null) {
      scene = [''];
    } else {
      scene = this.data.events.bloodbath[index];
    }

    const bloodbathForm = this.formBuilder.group({
      scene: [scene]
    });

    this.bloodbath.push(bloodbathForm);

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

  addEvents(nb: number) {

    let len = this.events.length;

    if (nb < len ) {
      while (nb < len) {
        this.removeEvent()
        nb++;
      }
    } else {
        while(nb > len) {
          this.addEvent(this.events.length);
          nb--;
        }
    } 

  }

  removeEvent() {
    this.events.removeAt(this.events.length - 1);
  }

  removeEventByIndex(index: number) {
    this.events.removeAt(index);
  }

  removeContestant() {    
    this.contestants.removeAt(this.contestants.length - 1);
  }

  removeContestantByIndex(index: number) {    
    this.contestants.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid || 1) {
      console.warn(this.form.value);
    }
  }

  
  saveContestants(fileName: string) {
    
    const json = this.form.value;
    const blob = new Blob([JSON.stringify(this.form.value)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
    
  }
  

}
