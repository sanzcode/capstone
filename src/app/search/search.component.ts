import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking.component';
import { ApisService } from '../services/apis.service';
import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 
import { HttpClient } from '@angular/common/http';
import { Auth, Logger, Hub } from 'aws-amplify';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private apiService: ApisService, private modalService: NgbModal, private http: HttpClient
  ) {}
  pay: boolean = false;
  payed: boolean = false;
  closeResult = ''; 
  bookings:  Booking[] = [];
  orig: string;
  dest: string;
  goDate: Date;
  returnDate: Date;
  passenger: number;
  Flights: string[]  =  ['AB', 'IB', 'BA', 'LX', 'RY', 'ES'];
  refBook: string[]  =  ['A4G65', '567GHH', '89KJH', '56FRD', '09LKIJ', '56SDR','HZGTF','09JUH','KLFDS'];
  name: String = "d";
  
  chosenBooking: Booking;
  searchedBooking: Booking = new Booking;
  found: boolean = false;
  //User chosen
  user: number;
  bookSearch: string;
  bookPayed: string;

  ngOnInit(): void {
    this.pay = false;
    Auth.currentSession();
    this.name = Auth.currentUserInfo.name;
    console.log("Username");
    Auth.currentUserInfo().then(user => {
      this.name = user.username; //user.attributes.email_verified
      console.log("Username");});
    }

  public  getResults(): void {
    this.found = false;
    this.pay = false;
    while (this.bookings.length !== 0) {
      this.bookings.pop();
    }
   // this.apiService.getBookingList().subscribe(booking => this.bookings = booking);
    let numberFlights = Math.floor(Math.random() * (10 - 3) + 3);  
    let Hour = Math.floor(Math.random() * 23); 
    let minute = Math.floor(Math.random() * 59);  
    let flightNumber = Math.floor(Math.random() * (1 - 6) + 1);
    var i;
    for (i = 0; i < numberFlights; i++) {
      let flight = this.Flights[Math.floor(Math.random() * (6 - 1) + 1)] ; 
      let newBooking: Booking;
      newBooking = {    
        id: i,
        BookRef: "ABCSD",
        FlightCode: flight + Math.floor(Math.random() * (999 - 100) + 100), 
        Origin: this.orig, 
        Destination: this.dest, 
        DeptDate: this.goDate,
        DeptTime: "19:20",
        ReturnDate: this.returnDate,
        ReturnTime: "13:20",
        Price: Math.round(Math.random() * (1500 - 40) + 40)
      };
        this.bookings.push(newBooking);
    }
  }

  Book(id) { 
        this.found = false;
        this.pay = true;
        this.user = id;
        this.chosenBooking = this.bookings[id];
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

  confirmBook(){ 
    this.found = false;
    this.pay = false;
    this.payed = true;
    this.bookPayed = "YHKIOP"; 
    while (this.bookings.length !== 0) {
      this.bookings.pop();
    }
  } 

  cancelBook(){ 
    this.found = false;
    this.pay = false;
    this.payed = false;
    this.user = null;
  } 
//    this.found = YHKIOP;
  SearchBooking(): void{
    this.payed = false;
    this.searchedBooking.BookRef = this.bookSearch;

    this.http.get<any>('https://o0feonpvc0.execute-api.eu-west-1.amazonaws.com/dev/bookings/'+this.bookSearch).subscribe({
      next: data => {
           let n = this.bookSearch.localeCompare(data.bookRef);
           console.log("data.bookRef");
           console.log(data.bookRef);
          if (n === 0){
          this.searchedBooking.BookRef = data.bookRef;
          this.searchedBooking.DeptDate = data.deptDate;
          this.searchedBooking.DeptTime = data.deptTime;
          this.searchedBooking.Destination = data.destination;
          this.searchedBooking.FlightCode = data.flightCode;
          this.searchedBooking.Origin = data.origin;
          this.searchedBooking.Price = data.price;
          this.searchedBooking.ReturnDate = data.returnDate;
          this.searchedBooking.ReturnTime = data.returnTime;
          this.searchedBooking.id = data.ID;
          this.found = true;
          this.payed = false;
        }else{
          alert("Booking number not found");
        } },
      error: error => {
          console.error('There was an error!', error);
          alert("Booking number not found");
      }})
      this.payed = false;
}}
