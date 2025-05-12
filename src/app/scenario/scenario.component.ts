import { Component, inject} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from '../home/home.component';

import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-scenario',
  providers: [],
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormComponent],
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.scss'
})
export class ScenarioComponent {

  private home = new HomeComponent;

  private name = "scenario name";

  constructor() {}

}