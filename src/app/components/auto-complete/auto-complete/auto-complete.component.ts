import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() stationData: any
  myControl = new FormControl();
  options: string[] = [];
  selectedStation = {};
  filteredOptions: Observable<string[]>;

  @Output() selectedStationEmit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.options = this.stationData || [];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      // map(value => this._filter(value)),
      map(value => (value ? this._filter(value) : this.options.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  setSelectedStation(e) {
    if (e && e.option && e.option.value) {
      let station = this.options.filter((st: any) => st.name === e.option.value);
      this.selectedStation = (station && station.length) ? station[0] : {};
      this.selectedStationEmit.emit(this.selectedStation)
      console.log('selected stations -->', this.selectedStation)
    }
  }

}
