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
  coords = {lat:0, lgn:0};

  constructor(private formBuilder: FormBuilder, firestore: AngularFirestore) {
    
    this.form = this.formBuilder.group({
      countries: [''],
      cities: ['']
    });
    this.countries = firestore.collection('countries').valueChanges();
    this.cities = new Observable<any[]>();
    this.firestore = firestore;
  }

  newCountry(country: string) {
    this.cities = this.getCities(country);
  }

  newCity(coords: string) {
    this.coords.lat = parseFloat(coords.split(',')[0]);
    this.coords.lgn = parseFloat(coords.split(',')[1]);
  }

  getCities(input: string) {
    return this.firestore.collection("/allCities", ref => ref.where("country", "==", input)).valueChanges();
  }

  submit() {
    console.log(JSON.stringify(this.coords));
  }

  ngOnInit(): void {
  }

}
