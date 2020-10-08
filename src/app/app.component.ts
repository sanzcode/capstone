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

  listener: any;
  self: any;
  title = 'capstone-app';
  authenticated: boolean = false;
  
  bookings: Booking[];

  ngOnInit() {
    this.authenticated = false;
    const logger = new Logger('Logger', 'INFO');
    this.self = this;
    this.listener = (data, self = this.self) => {
      switch (data.payload.event) {
        case 'signIn':
          logger.info('user signed in');
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

    Hub.listen('auth', this.listener);

  }

  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
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
    const self = this;
    Auth.currentSession()
    .then(data =>
      self.authenticated = true
    )
    .catch(err => 
      alert("Please Login")
      );
  }
  Signout(): void{
    this.authenticated = false;
  }

 

}
