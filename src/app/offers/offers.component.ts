import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
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
  user!: User;
  constructor(
    private offersService: OffersService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setOffers();
    this.user = this.authService.getUserFromStorage();
  }

  candidate(offer: Offer): void{
    let user = this.authService.getUserFromStorage();

    if (offer.candidateIds.includes(user.id)) {
        alert(`You can't candidate more than once`);
        return;
    }
    
    let userForEdit = this.usersService.getUser$(user.id);
    offer.candidateIds.push(user.id);
    offer.candidates.push(user);
    
    this.offersService.putOffer$(offer).subscribe();
    userForEdit.pipe(
      map((res: User) =>{
        res.approvedOffersIds.push(offer.id);
        return res;
      }
    ),
    take(1))
    .subscribe({
      next: (res: User)=>{
        this.usersService.patchUser$(res).subscribe();
        this.setOffers();
        alert(`Successfully applied for offer: ${offer.title}`)
      }
    });

  }

  delete(offerId: number): void{
    if(confirm("Are you sure you want to delete " + this.offers.find(x=>x.id == offerId)?.title)) {
       this.offersService.deleteOffer$(offerId).subscribe(
      {
        next: () =>{
          this.offers = this.offers.filter(o => o.id != offerId);
        }
      }
    );
    }
  }

  private setOffers(): void{
    this.offersService
    .getOffers$()
    .pipe(
      map((res: Offer[])=>{
        res = res.sort((a,b) => b.id - a.id).filter(x=>x.isActive || x.creatorId == this.user.id);

        res.forEach(o =>{
          this.setCreator(o, o.creatorId);
          this.setUsers(o);
        })
        
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
          delete res.password;
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
