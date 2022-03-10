import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoordinatesService } from '../coordinates.service';
// import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
@Injectable()
export class WeatherCurrentComponent implements OnInit {
  weatherInfo: { main: [], name: '', dt: 0 };
  main: Observable<any[]>;
  name: '';
  time: number;
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService
  ) {
    this.weatherInfo = { main: [], name: '', dt: 0 };
    this.main = new Observable<any[]>();
    this.name = '';
    this.time = 0;
    this.coordinates = coordinates;
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(): void {
    this.coordinates.getCurrentResults()
        .subscribe(data => {
          this.parseData(data)});
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
    console.log(this.weatherInfo);
    this.main = of(Object.entries(this.weatherInfo.main));
    this.name = this.weatherInfo['name'];
    this.time = this.weatherInfo['dt'];
  }
  Date(time: number) {
    let date = new Date(time.valueOf());
    let day = date.toLocaleDateString("sv-SE");
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day} ${hour}:${minutes}`;

  }
  // This had to be done to format the website, instead of returning "temp" it was much nicer displaying "Temperature: " for example. This array would have to be changed if the API changed. 
  currentWeatherValues(index: number) {
    const values = {
      parameters: ["Temperature", "Feels like", "Minimum temperature at current time", "Maximum temperature at current time",
        "Atmospheric pressure", "Humidity", "Pressure (sea level)", "Pressure (ground level)"], units: ["°C", "°C", "°C", "°C", "hPa", "%", "hPa", "hPa"]
    };
    return [values.parameters[index], values.units[index]];
  }
}

