import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  formGroup!:FormGroup;
  offer!: Offer;
  
  destroy$ = new Subject<boolean>();
  
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private offersService: OffersService
  ) { 
    this.offer = {
    id: 0,
    title: '',
    description: '',
    type: '',
    isActive: false,
    category: '',
    creatorId: 0,
    candidateIds: [],
    creator: null as any,
    candidates: null as any,
    approvedIds: [],
    approved: null as any,
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params)=>{
        if (params['id']) {
          return this.offersService.getOffer$(params['id']); 
        }

        this.initForm();

        return of(null); 
      }),
      takeUntil(this.destroy$) 
    ).subscribe({
      next: (res) => {
        if (res) { 
          this.offer = res;
        }
        
        this.initForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); 
  }

  onSubmit(): void {
    console.log(12);
    
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched;
      
      return;
    }
    console.log('valid');
    
    const offer: Offer = {
      id: this.formGroup.value.id,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      type: this.formGroup.value.type,
      category: this.formGroup.value.category,
      isActive: this.formGroup.value.isActive,
      creatorId: this.offer.creatorId,
      candidateIds: this.offer.candidateIds,
      creator: this.offer.creator,
      candidates: this.offer.candidates,
      approvedIds: this.offer.approvedIds,
      approved: this.offer.approved,
    }
    
    let request$;

    if(offer.id){
      request$ = this.offersService.patchOffer$(offer);//edit
    }else{

      request$ = this.offersService.postOffer$(offer);//create
    }

    request$.subscribe(
      {
        next: (res) => {
          console.log(res);
          
          this.router.navigate(['/offers']) 
         }
      }
    ); 
  }

  eventCheck(): void{
    this.formGroup.value.isActive =  !this.formGroup.value.isActive;
    console.log(this.formGroup.value.isActive);
    
  }

  private initForm(): void{
    console.log(this.offer.title);
    
    this.formGroup = this.fb.group({
      id: this.offer.id,
      title: this.offer.title,
      description: this.offer.description,
      type: this.offer.type,
      category: this.offer.category,
      isActive: this.offer.isActive,
    })    
  }
}
