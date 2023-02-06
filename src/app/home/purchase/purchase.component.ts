import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/models/Offer';
import { PaymentType } from 'src/app/models/PaymentType';
import { Purchase } from 'src/app/models/Purchase';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { OffersService } from 'src/app/services/offers-service/offers.service';
import { PaymentTypeService } from 'src/app/services/payment-type-service/payment-type.service';
import { PurchasesService } from 'src/app/services/purchases-service/purchases.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public user: User|null = null;
  public offer: Offer|null = null;
  public paymentTypes: PaymentType[] = [];
  public selectedPaymentType: string = "";
  public isCardPayment: boolean = false;

  public form: FormGroup = new FormGroup({});

  @ViewChild('types') types!: ElementRef;
	
  constructor(private purchaseService: PurchasesService, private paymentTypeService: PaymentTypeService, private authService: AuthService, private offerService: OffersService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.paymentTypeService.findAll().subscribe((data) => this.paymentTypes = data);
    if(this.authService.activeUser) this.user = this.authService.activeUser;
    this.offerService.offer.subscribe((value: Offer) => {
      this.offer = value;
    });
    this.form = this.formBuilder.group({
      product: [this.offer?.product.name],
      price: [this.offer?.product.price + "KM"],
      card: [null],
      select: new FormControl()
    });
  }

  public makePurchase() {

    let paymentType = this.paymentTypes.find(t => t.name === this.selectedPaymentType);
    let currentDateTime = this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    let card = this.form.value.card;
    if(this.isCardPayment && card==null) {
      this.toast.warning("Unesite broj kartice ili izaberite drugi način plaćanja!");
    }
    else {
      if(paymentType && currentDateTime && this.offer && this.user) {
        let newPurchase = new Purchase(null, currentDateTime, card, paymentType, this.offer, this.user);
  
        this.purchaseService.add(newPurchase).subscribe({
          next: (result: Purchase) => {
  
            let updatedOffer = result.offer;
            updatedOffer.isActive = false;
  
            this.offerService.updateOffer(updatedOffer).subscribe({
              next: (result: Offer) => {
                this.toast.success("Uspješno ste kupili proizvod!");
                this.router.navigate(['/home']);
              },
              error: (response: HttpErrorResponse) => {
                this.toast.error("Došlo je do greške prilikom kupovine! Pokušajte ponovo.");
              }
            });
          },
          error: (response: HttpErrorResponse) => {
            this.toast.error("Došlo je do greške prilikom kupovine! Pokušajte ponovo.");
          }
        });
      }
    }
  }

	selectChangeHandler (event: any) {
    this.selectedPaymentType = event.target.value;
    this.isCardPayment = event.target.value === 'KARTICNO';
  }
}
