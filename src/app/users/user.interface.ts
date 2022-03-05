import { Offer } from "../offers/offer.interface";

export interface User{
    "id": number,
    "name": string,
    "email": string,
    "password"?: string,
    "role": string,
    "approvedOffersIds": number[],
    "approvedOffers": Offer[],
    "createdOfferIds": number[],
    "createdOffers": Offer[],
}