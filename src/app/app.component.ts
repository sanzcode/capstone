import { Component, OnInit } from '@angular/core';
import { ApisService } from './services/apis.service';
import { Booking } from './model/booking.component';
import { Auth, Logger, Hub } from 'aws-amplify';
import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private apiService: ApisService, private modalService: NgbModal
  ) {
  }

  title = 'capstone-app';
  authenticated: boolean = false;
  name: String = "Juan";
  
  bookings: Booking[];

  ngOnInit() {
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    this.authenticated = false;
    const logger = new Logger('Logger', 'INFO');
    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          logger.info('user signed in');
          this.authenticated = true;
          break;
        case 'signUp':
          logger.info('user signed up');
          break;
        case 'signOut':
          logger.info('user signed out');
          break;
        case 'signIn_failure':
          logger.info('user sign in failed');
          break;
        case 'configured':
          logger.info('the Auth module is configured');
          break;
        default:
          logger.error('Something went wrong, look at data object', data);
      }
    }

    Hub.listen('auth', listener);

  }

  ngOnLoad() {
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    this.authenticated = false;
  }

  getBookings(): void {
    null
  }

  CheckAuth(): void{
    Auth.currentSession();
    this.authenticated = true;
    this.name = Auth.currentUserInfo.name;
    console.log("Hello");
    console.log(Auth.currentUserInfo.name);
  }
  Signout(): void{
    this.authenticated = false;
  }

 

}
