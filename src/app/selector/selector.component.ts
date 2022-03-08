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
  firestore: AngularFirestore
  coordinates: CoordinatesService
  coords = {lat:0, lgn:0};

  constructor(private formBuilder: FormBuilder, firestore: AngularFirestore, coordinates: CoordinatesService) {
    
    this.form = this.formBuilder.group({
      countries: [''],
      cities: ['']
    });
    this.countries = firestore.collection('countries').valueChanges();
    this.cities = new Observable<any[]>();
    this.firestore = firestore;
    this.coordinates = coordinates;
  }

  newCountry(country: string) {
    this.cities = this.getCities(country);
  }

  set latitude(data: number){
    this.coordinates.lat = data;
  }

  set longitude(data: number){
    this.coordinates.lgn = data;
  }




  newCity(coords: string) {
    this.coords.lat = parseFloat(coords.split(',')[0]);
    this.coords.lgn = parseFloat(coords.split(',')[1]);
  }

  getCities(input: string) {
    return this.firestore.collection("/allCities", ref => ref.where("country", "==", input)).valueChanges();
  }

  submit() {
    this.coordinates.lat = this.coords.lat;
    this.coordinates.lgn = this.coords.lgn;
  }

  ngOnInit(): void {
  }

}
