import { NgModule } from "@angular/core";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {  faGamepad, 
          faTimes, 
          faRobot, 
          faUser, 
          faHandRock, 
          faHandPaper, 
          faHandScissors, 
          faCogs, 
          faSpinner,
          faBug } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    exports: [FontAwesomeModule]
})
export class FontAwesomeImportModule {
    
  constructor(library: FaIconLibrary) {
    library.addIcons(
        faGamepad,
        faTimes,
        faRobot,
        faUser,
        faHandRock,
        faHandPaper,
        faHandScissors,
        faCogs,
        faSpinner,
        faBug);
  }

}