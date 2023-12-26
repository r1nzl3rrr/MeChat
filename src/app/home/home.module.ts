import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { DateDisplayPipe } from '../pipes/date-display.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    DateDisplayPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
