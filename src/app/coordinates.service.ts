import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  lat: number
  lon: number
  constructor() {
    this.lat = 30;
    this.lon = 60;
  }
}
