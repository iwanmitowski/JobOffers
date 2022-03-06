import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from './offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private baseUrl = `${environment.apiUrl}/offers`

  constructor(private http: HttpClient) {
   }

   getOffers$(): Observable<Offer[]>{
     return this.http.get<Offer[]>(this.baseUrl);
   }

   getOffer$(id: number): Observable<Offer>{
     const url = `${this.baseUrl}/${id}`;

     return this.http.get<Offer>(url);
   }

   postOffer$(offer: Offer): Observable<Offer>{
     return this.http.post<Offer>(this.baseUrl,offer);
   }

   putOffer$(offer: Offer): Observable<Offer>{
    const putUrl = `${this.baseUrl}/${offer.id}`;

    return this.http.put<Offer>(putUrl, offer);
  }

  patchOffer$(offer: Offer): Observable<Offer>{
    const patchUrl = `${this.baseUrl}/${offer.id}`;
    console.log(offer);
    
    return this.http.patch<Offer>(patchUrl, offer);
  }

  deleteOffer$(id: number): Observable<void>{
    const deleteUrl = `${this.baseUrl}/${id}`;
    
    return this.http.delete<void>(deleteUrl);
  }

  // addCandidate$(id: number): Observable<void>{
  //   const patchUrl = `${this.baseUrl}/${id}`

  //   return this.http.patch<void>(deleteUrl);
  // }
}
