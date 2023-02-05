import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { MyComment } from 'src/app/models/MyComment';
import { Offer } from 'src/app/models/Offer';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CommentsService } from 'src/app/services/comments-service/comments.service';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  public offer: Offer|null = null;
  public comments: MyComment[] = [];
  public userSignedIn: boolean = false;

  public commentForm: FormGroup = new FormGroup({});

  constructor(private offersService: OffersService, private commentsService: CommentsService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toast: ToastrService) {
  }

  ngOnInit() : void {
    this.offersService.offer.subscribe((value: Offer) => {
      this.offer = value;
      if(value.id) 
        this.getComments(value.id);
    });
    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.required]
    });
    this.userSignedIn = this.authService.isSignedIn && this.authService.isActivated;
  }

  private getComments(id:number) {
    this.commentsService.findCommentsByOfferId(id).subscribe((result) => this.comments = result);
  }

  public saveComment() {
    let content = this.commentForm.value.comment;
    if(this.authService.activeUser && this.offer) {
      let comment = new MyComment(null, content, this.authService.activeUser, this.offer);

      this.commentsService.addNew(comment).subscribe({
        next: (result: MyComment) => {
          this.toast.success("Komentar je uspješno poslan!");
          if(result.offer.id) this.getComments(result.offer.id);
          this.commentForm.reset();
        },
        error: (response: HttpErrorResponse) => {
          this.toast.error("Došlo je do greške prilikom slanja komentara! Pokušajte ponovo.");
        }
      });
    }
  }

  public getCategoryName(c: Category): string {
    if(c.parentCategory != null) {
      return this.getCategoryName(c.parentCategory) + "  >>  " + c.name;
    }
    else {
      return c.name;
    }
  }
  
  public buyProduct() {

  }
}
