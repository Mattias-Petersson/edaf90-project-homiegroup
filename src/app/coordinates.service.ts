import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoordinatesService {
  lat: number;
  lon: number;
  name: string;
  current: Subject<any>;
  forecast: Subject<any>;
  alert: Subject<any>;
  constructor(private http: HttpClient) {
    this.lat = 44.9;
    this.lon = 14.6;
    this.current = new Subject();
    this.forecast = new Subject();
    this.alert = new Subject();
    this.name = "";
  }
  getCurrentWeather(): void {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    this.http.get(url).subscribe({
      next: (result) => this.current.next(result),
    });
  }

  getWeatherForecast(): void {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    this.http.get(url).subscribe({
      next: (result) => this.forecast.next(result),
    });
  }

  getAlert(): void {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,minutely,hourly,daily&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    this.http.get(url).subscribe({
      next: (result) => this.alert.next(result),
    });
  }

  getCurrentResults(): Subject<Object> {
    return this.current;
  }

  getForecastResults(): Subject<Object> {
    return this.forecast;
  }

  getAlertResults(): Subject<Object> {
    return this.alert;
  }
}
