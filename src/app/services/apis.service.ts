import { Injectable } from '@angular/core';
import { Booking } from '../model/booking.component';
//import { Bookings } from '../mock/mock-booking';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
// npm install rxjs-compat --save
// https://stackblitz.com/edit/samp-angular-services-with-mock-data?file=app%2Fsample%2Fservers-class.component.ts

@Injectable({
  providedIn: 'root'
})

export class ApisService {

   Bookingrequest = {
    host: 'https://o0feonpvc0.execute-api.eu-west-1.amazonaws.com',
    method: 'GET',
    url:  `https://o0feonpvc0.execute-api.eu-west-1.amazonaws.com/dev/bookings/`,
    path: '/dev/bookings'
  }

  constructor(private http: HttpClient) { }

  getBo

  async getTrip(tripId: string) {
    this.http.get<any>('https://o0feonpvc0.execute-api.eu-west-1.amazonaws.com/dev/bookings/YHKIOP').subscribe({
      next: data => {
          console.log(data.total);
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }



}
