import { Component, OnInit } from '@angular/core';
import { Offer } from './offer.interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers: Offer[] = [];

  constructor() { }

  ngOnInit(): void {
    this.offers.push( {
      "id": 1,
      "title": "some comment",
      "description": "some comment",
      "type": "some comment",
      "isActive": true,
      "category": "some comment",
      "creatorId": 2,
      "candidates":[
        1
      ],
      "approved":[
        3
      ]
    })
    this.offers.push( {
      "id": 2,
      "title": "some comment",
      "description": "some comment",
      "type": "some comment",
      "isActive": true,
      "category": "some comment",
      "creatorId": 2,
      "candidates":[
        1
      ],
      "approved":[
        3
      ]
    })
  }

}
