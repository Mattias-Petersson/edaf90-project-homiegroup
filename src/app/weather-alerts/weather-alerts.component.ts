import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html',
  styleUrls: ['./weather-alerts.component.css'],
})
@Injectable()
export class WeatherAlertsComponent implements OnInit {
  alertInfo: { main: []; sender_name: ''; start: 0; end: 0 };
  main: Observable<any[]>;
  sender_name: '';
  start: number;
  end: number;
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService) {
    this.alertInfo = { main: [], sender_name: '', start: 0, end: 0 };
    this.main = new Observable<any[]>();
    this.sender_name = '';
    this.start = 0;
    this.end = 0;
    this.coordinates = coordinates;
  }

  ngOnInit(): void {
    this.getAlertData();
  }

  getAlertData(): void {
    this.coordinates.getAlertResults().subscribe((data) => {
      this.parseData(data);
    });
  }

  parseData(data: any) {
    this.alertInfo = data;
    console.log('halååååå');
    this.main = of(Object.entries(this.alertInfo.main));
    this.sender_name = this.alertInfo['sender_name'];
    this.start = this.alertInfo['start'];
    this.end = this.alertInfo['end'];
  }
  Date(time: number) {
    let date = new Date(time.valueOf());
    let day = date.toLocaleDateString('sv-SE');
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day} ${hour}:${minutes}0`;
  }
  currentAlertValues(index: number) {
    const values = {
      parameters: ['Alert from', 'Start time', 'End time', 'Alert'],
    };
    return values.parameters[index];
  }
}
