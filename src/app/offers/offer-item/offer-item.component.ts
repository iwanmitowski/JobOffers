import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {

  @Input() offer!: Offer;
  
  @Output() offerClicked: EventEmitter<Offer> = new EventEmitter<Offer>();

  constructor(
    private userService: UsersService,
    private offersService: OffersService,
  ) { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.offerClicked.emit(this.offer);
  }

}
