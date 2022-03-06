import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/user.interface';
import { UsersService } from 'src/app/users/users.service';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {

  user!: User;
  @Input() offer!: Offer;
  
  @Output() offerClicked: EventEmitter<Offer> = new EventEmitter<Offer>();
  @Output() offerDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private userService: UsersService,
    private offersService: OffersService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage();
  }

  onClick(): void{
    this.offerClicked.emit(this.offer);
  }

  onDelete(): void{
    this.offerDeleted.emit(this.offer.id);
  }

}
