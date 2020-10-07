import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FlightModel } from '../model/flight-model';
import { DatePipe } from '@angular/common'

const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FlightService {
  allFlights: FlightModel[] = [];
  flightResults: Array<FlightModel[]> = [];
  toFlightResults: FlightModel[] = [];
  froFlightResults: FlightModel[] = [];
  flightsUrl = 'api/flights';  // URL to fetch details from
  deptDt1: string;
  deptDt2: string;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  /** GET flight details from the server */
  getFlightDetails(flt: FlightModel[], lower, upper): Array<FlightModel[]> {
    this.flightResults = [];
    this.toFlightResults = [];
    this.froFlightResults = [];
    this.http.get<FlightModel[]>(this.flightsUrl)
      .subscribe(res => {
        this.allFlights = res;
        // f=0 means it has departure date of to flight
        // f=1 means it has dept date of fro flight
        for (let f = 0; f < flt.length; f++) {
          for (let i = 0; i < this.allFlights.length; i++) {
            let od1 = this.allFlights[i].OriginDestination;
            let od2 = flt[f].OriginDestination;
            // Transforming date values to ease comparison
            this.deptDt1 = this.datepipe.transform(od1.DeptDate, 'yyyy-MM-dd');
            this.deptDt2 = this.datepipe.transform(od2.DeptDate, 'yyyy-MM-dd');
            // Check conditions that satisfy user input to flight details in DB
            if (od1.Origin == od2.Origin && od1.Destination == od2.Destination &&
              this.deptDt1 === this.deptDt2 && this.allFlights[i].SeatsAvailable > flt[f].SeatsAvailable
              && this.allFlights[i].FareDetails >= lower && this.allFlights[i].FareDetails <= upper) {
              if (f === 0) {
                this.toFlightResults.push(this.allFlights[i]);
              } else {
                this.froFlightResults.push(this.allFlights[i]);
              }
            }
          }
        }
        this.flightResults[0] = this.toFlightResults;
        this.flightResults[1] = this.froFlightResults;
      });
    // Returns combined to flight and fro flight details
    return this.flightResults;
  }
}
