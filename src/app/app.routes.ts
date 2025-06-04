import { Routes } from '@angular/router';

import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { GameComponent } from './game/game.component';

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
    },

    {
        path: "game",
        component: GameComponent
    }

];
