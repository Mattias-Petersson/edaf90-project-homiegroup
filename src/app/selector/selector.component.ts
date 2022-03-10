import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CoordinatesService } from '../coordinates.service';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  form: FormGroup;
  countries: Observable<any[]>;
  cities: Observable<any[]>;
  country: string;
  city: string;
  firestore: AngularFirestore;
  cityDisabled: boolean;
  coordinates: CoordinatesService;
  coords = { lat: 0, lon: 0 };

  constructor(private formBuilder: FormBuilder, firestore: AngularFirestore, coordinates: CoordinatesService) {
    this.city = "";
    this.country = '';
    this.form = this.formBuilder.group({
      countries: [this.country],
      cities: [this.city]
    });
    this.countries = firestore.collection('countries').valueChanges();
    this.cities = new Observable<any[]>();
    this.firestore = firestore;
    this.coordinates = coordinates;
    this.cityDisabled = true;
  }

  newCountry(country: string) {
    if(country === "null") {
      this.cities = new Observable<any[]>();
      this.country = "";
      this.coords.lat = 0;
      this.coords.lon = 0;
      this.city = "";
    }
    else {
      this.cities = this.getCities(country);
      this.country = country;
    }
  }

  set latitude(data: number) {
    this.coordinates.lat = data;
  }

  set longitude(data: number) {
    this.coordinates.lon = data;
  }




  newCity(coords: string) {
    if(coords !== "") {
      this.coords.lat = parseFloat(coords.split(',')[2]);
      this.coords.lon = parseFloat(coords.split(',')[3]);
      this.city = coords.split(',')[0] + ', ' + coords.split(',')[1];
      console.log("submitted");
      this.coordinates.lat = this.coords.lat;
      this.coordinates.lon = this.coords.lon;
      this.coordinates.getCurrentWeather();
      this.coordinates.getWeatherForecast();
    }
    else{
      this.coords.lat = 0;
      this.coords.lon = 0;
      this.city = "";
    }
  }

  getCities(input: string) {
    return this.firestore.collection("/allCities", ref => ref.where("country", "==", input)).valueChanges();
  }

  submit() {
    if(this.city !== "" && this.country !== ""){
      
    }
  }

  ngOnInit(): void {
  }

}
