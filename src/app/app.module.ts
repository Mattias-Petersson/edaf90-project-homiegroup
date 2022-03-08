import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { ContainerComponent } from './container/container.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherCurrentComponent } from './weather-current/weather-current.component';
import { WeatherAlertsComponent } from './weather-alerts/weather-alerts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    ContainerComponent,
    WeatherForecastComponent,
    WeatherCurrentComponent,
    WeatherAlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
