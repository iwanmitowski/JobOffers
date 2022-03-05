import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';
import { Offer } from './offer.interface';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers: Offer[] = [];

  constructor(
    private offersService: OffersService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.setOffers();
  }


  private setOffers(): void{
    this.offersService
    .getOffers$()
    .pipe(
      map((res: Offer[])=>{
        res.forEach(o =>{
          this.setCreator(o, o.creatorId);
          this.setUsers(o);
        })
        console.log(res);
        
        return res;
      }),
      take(1)
    )
    .subscribe({
      next: (res: Offer[])=>{
        this.offers = res;
      }
    })
  }

  private setCreator(offer: Offer,id: number): void{
    this.usersService
    .getUser$(id)
    .subscribe(
      {
        next: (res: User) =>{
          offer.creator = res;
        }
      }
    )
  }

  private setUsers(offer: Offer): void{
    this.usersService
    .getUsers$()
    .pipe(
      map((res: User[])=>{
        const users = res.filter(u => offer.candidateIds.includes(u.id))
        return users;
    }),
    take(1))
    .subscribe(
      {
        next: (res: User[]) =>{
          offer.candidates = res;
          offer.approved = offer.candidates.filter(u => offer.approvedIds.includes(u.id))
        }
      }
    )
  }
}
