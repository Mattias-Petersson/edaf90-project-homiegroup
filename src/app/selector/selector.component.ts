import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  form: FormGroup;
  countries: { id: string, name: string}[];
  cities: {id: string, name: string, admin: string}[];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      countries: [''],
      cities: ['']
    });
    this.countries = this.getCountries();
    this.cities = [];

  }

  submit() {
    console.log(this.form.value);
  }

  getCountries() {
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  newCountry(id: string) {
    console.log('hi');
    console.log(id);
    this.cities = this.getCities(id);
  }

  getCities(input: string) {
    if(input == '1') {
      return [{ id: '1', name: 'city 1', admin: 'area 1'},
      { id: '2', name: 'city 2', admin: 'area 1'}
    ]
    }
    else {
      return [{ id: '1', name: 'city 1', admin: 'other area'},
      { id: '2', name: 'city 2', admin: 'other area'}
    ]
    }
  }


  ngOnInit(): void {
  }

}
