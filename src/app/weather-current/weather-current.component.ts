import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
@Injectable()
export class WeatherCurrentComponent implements OnInit {
  weatherInfo: {};
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService
  ) {
    this.weatherInfo = {};
    this.coordinates = coordinates;

  }

  ngOnInit(): void {
    this.getWeather(55.61, 13.00);
  }
  getWeather(lat: number, lon: number) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    this.http.get(url).subscribe({
      next: result => this.parseData(result),
      complete: () => console.log('Done!')
    })
  }
  parseData(data: any) {
    this.weatherInfo = data;
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
