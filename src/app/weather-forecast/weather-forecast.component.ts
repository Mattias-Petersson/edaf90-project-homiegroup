import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherForecast: { hourly: [] };
  hourly: Observable<any[]>;
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService
  ) {
    this.weatherForecast = { hourly: [] };
    this.hourly = new Observable<any[]>();
    this.coordinates = coordinates;
  }

  ngOnInit(): void {
    this.getWeather(55.61, 13.00);
  }
  getWeather(lat: number, lon: number) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    this.http.get(url).subscribe({
      next: result => this.parseData(result),
      complete: () => console.log('Done!')
    })

  }
  parseData(data: any) {
    this.weatherForecast = data;
    this.hourly = of(this.weatherForecast.hourly);
  }
  // Gets the current date. 
  Date(time: number) {
    let date = new Date(time.valueOf());
    let day = date.toLocaleDateString("sv-SE");
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day} ${hour}:${minutes}0`;

  }
}
