import { Component, Injectable, OnInit, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoordinatesService } from '../coordinates.service';

let test = {
  lat: 33.44,
  lon: -94.04,
  timezone: 'America/Chicago',
  timezone_offset: -21600,
  alerts: [
    {
      sender_name: 'NWS Tulsa',
      event: 'Heat Advisory',
      start: 1597341600,
      end: 1597366800,
      description:
        '...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.',
      tags: ['Extreme temperature value'],
    },
    {
      sender_name: 'NWS Dulsa',
      event: 'Heat Advisory',
      start: 1597341600,
      end: 1597366800,
      description:
        '...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.',
      tags: ['Extreme temperature value'],
    },
  ],
};

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html',
  styleUrls: ['./weather-alerts.component.css'],
})
@Injectable()
export class WeatherAlertsComponent implements OnInit {
  alertInfo: {
    alerts: [];
    start: number[];
    end: number[];
  };
  alerts: Observable<any[]>;
  start: number[];
  end: number[];
  coordinates: CoordinatesService;
  constructor(private http: HttpClient, coordinates: CoordinatesService) {
    this.alertInfo = {
      alerts: [],
      start: [],
      end: [],
    };
    this.alerts = new Observable<any[]>();
    this.start = [];
    this.end = [];
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
    data = test;
    this.alertInfo = data;
    this.alerts = of(this.alertInfo.alerts);
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
