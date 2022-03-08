import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  lat: number
  lgn: number
  constructor() { 
    this.lat = 0;
    this.lgn = 0;
  }
}
