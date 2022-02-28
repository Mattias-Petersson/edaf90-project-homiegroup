import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { ContainerComponent } from './container/container.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherCurrentComponent } from './weather-current/weather-current.component';
import { WeatherAlertsComponent } from './weather-alerts/weather-alerts.component';
import { Component } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
