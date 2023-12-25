import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    TextInputComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    ReactiveFormsModule,
    TextInputComponent,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule
  ]
})
export class SharedModule { }
