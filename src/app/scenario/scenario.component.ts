import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-scenario',
  providers: [],
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormComponent],
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.scss'
})

/**
 * @ignore
 */
export class ScenarioComponent {

}