import { Routes } from '@angular/router';

import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenario/scenario.component';

export const routes: Routes = [

    {
        path: "",
        component: DisclaimerComponent

    },

    {
        path: "home",
        component: HomeComponent
    },

    {
        path: "scenario",
        component: ScenarioComponent
    }

];
