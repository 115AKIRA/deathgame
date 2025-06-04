# Deathgame

Link to online documentation made with Compodoc : https://115akira.github.io/deathgame-documentation/

__Deathgame__ is an online app inspired by Brantsteele's Hunger Games simulator and Orteil's Murder Games. 
The goal of this project is to make a game with the ability to edit scenarios like the Hunger Game Simulator, while also having lots of options for the participants like in Murder Games.
Data management is an important part of this project, using .JSON files to store the scenarios and using JavaScript sessions to keep track of selected options. 
2 scenarios are provided at base, with possibility to add more in the future.

This current version is a __prototype__ which sets out to perfectly manage the scenario editing aspect and provides one test case. No death game is present yet.

## Current progress of the project :
* Disclaimer and Homepage : Mostly operational (Can set up the options and games to play, though lacking the ability to import a scenario)
* Scenario editing : Completely operational (Can modify the contestants and events using a base scenario as a template and export your modified scenario)
* Game : Non-operational - WIP

## Data specifications :
A scenario is made of 4 main parts :
- a title (public name)
- a name (internal name)
- contestants (a set of multiple contestants)
- events (a set of multiple events of different types)

Events exist in 3 types :
- Bloodbath
- Day events
- Special events (special events are split into two part : an event name and sub-events. A special event can have multiple sub-events, though a sub-event can only be the sub-event of one special event)
