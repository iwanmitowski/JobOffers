import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  private routeSub!: Subscription;
  private currentOfferId!: number;
  offer!: Offer;

  constructor(
    private activateRoute: ActivatedRoute,
    private offersService: OffersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe(params => {

      this.offersService
        .getOffer$(params['id']).subscribe({
          next: (res: Offer)=>{
            this.offer = res;
            console.log(this.offer);
            
            if (!this.offer) {
              this.router.navigate(['/','offers']);
            }
          }
        });
    });
  }

}
