import { NgModule } from "@angular/core";
import { FontAwesomeImportModule } from './module/font-awesome-import.module';
import { CommonModule } from '@angular/common';
import { ExternalCommunicationModule } from './service/external/external-communication.module';

@NgModule({
  exports: [
    FontAwesomeImportModule, 
    CommonModule, 
    ExternalCommunicationModule]
})
export class SharedModule {}