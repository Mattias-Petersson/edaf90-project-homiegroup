import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  lat: number
  lon: number
  constructor() {
    this.lat = 0;
    this.lon = 0;
  }
}
