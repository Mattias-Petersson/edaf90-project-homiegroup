import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
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
  weatherInfo: { hourly: [] };
  hourly: Observable<any[]>;
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService
  ) {
    this.weatherInfo = { hourly: [] };
    this.hourly = new Observable<any[]>();
    this.coordinates = coordinates;
  }

  ngOnInit(): void {
    this.getWeather(this.coordinates.lat, this.coordinates.lon);
  }
  getWeather(lat: number, lon: number) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`;
    const data = this.http.get(url).subscribe({
      next: result => this.parseData(result),
      complete: () => console.log('Done!')
    });
  }
  parseData(data: any) {
    this.weatherInfo = data;
    //   let test = this.weatherInfo.hourly.map(forecast => forecast["feels_like"]);
    this.hourly = of(this.weatherInfo.hourly);
    // console.log(this.dt);
    //   console.log(test);
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
