import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
@Injectable()
export class WeatherCurrentComponent implements OnInit {
  weatherInfo: { hourly: [] };
  hourly: Observable<any[]>;
  constructor(
  ) {
    this.weatherInfo = { hourly: [] };
    this.hourly = new Observable<any[]>();
  }

  ngOnInit(): void {
    this.getWeather(55.61, 13.00);
  }
  getWeather(lat: number, lon: number) {
    const data = fromFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=e013ee4b357a1f6290404c173646e3ce`).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        console.error(err);
        return of({ error: true, message: err.message })
      })
    );
    data.subscribe({
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
