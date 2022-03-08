import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
@Injectable()
export class WeatherCurrentComponent implements OnInit {
  // private currentWeatherTimestamp: number;
  
  constructor(
    private http: HttpClient
    ) { 
  }

  ngOnInit(): void {
  }
  
  getWeather() {
    let lat = 33.44; // Chicago
    let lon = -94.04;
    // Should make the API key hidden. 
    const res = this.http.get(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=e013ee4b357a1f6290404c173646e3ce`)
    const resSub = res.subscribe( {
      next(location) {
        console.log(`Current weather at ${location}: `);
      },error(){
        console.log('Error');
      }
    });

  }

  // 

  // getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
  //   return Observable.interval(this.weatherUpdateInterval).startWith(0)
  //     .switchMap(() =>
  //       this.http.get(
  //         `${apiConfig.host}/weather?appid=${apiConfig.appId}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
  //       )
  //         .map((response: Response) => response.json())
  //         .map((data) => {
  //           const weather = this.handleResponseWeatherData(data);

  //           this.weather.next(weather);
  //           return weather;
  //         })
  //         .catch(this.handleError)
  //     );
  // }
}