import { getLocaleFirstDayOfWeek, provideCloudflareLoader } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { Attribute } from 'src/app/models/Attribute';
import { Category } from 'src/app/models/Category';
import { Image } from 'src/app/models/Image';
import { ImageRequest } from 'src/app/models/ImageRequest';
import { Offer } from 'src/app/models/Offer';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { Value } from 'src/app/models/Value';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';
import { ImagesService } from 'src/app/services/images-service/images.service';
import { OffersService } from 'src/app/services/offers-service/offers.service';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent {
  public form: FormGroup = new FormGroup({});
  public attributesForm: FormGroup = new FormGroup({});

  public categories: Category[] = [];
  public selectElemenValues: {catTitle: string, catId: number}[] = [];

  public selectedCategoryId: number = 0;
  public selectedCategory: Category|undefined;
  public isNew: boolean = false;
  public attributes: Attribute[] = [];

  public activeUser : User|null = null;

  constructor(private authService: AuthService, private imagesService: ImagesService, private productsService: ProductsService, private offersService: OffersService, private categoriesService: CategoriesService, private formBuilder: FormBuilder, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.activeUser = this.authService.activeUser;
    this.categoriesService.findAll().subscribe(result => {
      this.categories = result;
      for(var c of result) {
        let catId = c.id;
        let catTitle = this.returnName(c);
        this.selectElemenValues.push({catTitle, catId});
      }
      this.selectElemenValues.sort((a, b) => a.catTitle.localeCompare(b.catTitle));  
    });
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      contact: [null, Validators.required],
      address: [null, Validators.required],
      select: new FormControl(),
      isNew: new FormControl(),
      image1: [null],
      image2: [null],
      image3: [null],
      image4: [null],
      image5: [null],
      attributes: this.attributesForm
    });
  }

  public returnName(c: Category): string {
    return this.categoriesService.getCategoryTitle(c);
  } 

  selectChangeHandler (event: any) {
    this.selectedCategoryId = event.target.value;
    this.selectedCategory = this.categories.find(t => t.id == this.selectedCategoryId);
    if(this.selectedCategory) {
      this.categoriesService.getCategoryAttributes(this.selectedCategory.id).subscribe(
        data=>{
          this.attributes=data;
          this.attributesForm = new FormGroup({});
          this.attributes.forEach(attr => this.attributesForm.addControl(attr.name, new FormControl('')));
      });
    } 
  }

  isNewChecked(event: any) {
    this.isNew = event.target.checked;
  }

  public save() {
    
    let name = this.form.value.name;
    let description = this.form.value.description;
    let price = this.form.value.price;
    let contact = this.form.value.contact;
    let address = this.form.value.address;
    let category = this.selectedCategory;
    let isNew = this.isNew;
    let image1 = this.form.value.image1;
    let image2 = this.form.value.image2;
    let image3 = this.form.value.image3;
    let image4 = this.form.value.image4;
    let image5 = this.form.value.image5;

    if(category && this.activeUser && this.activeUser.id) {
      let userId = this.activeUser.id;
      let newProduct = new Product(null, name, description, price, isNew, contact, category, address, []);
      
      this.productsService.add(newProduct).subscribe({
        next: (result: Product) => {
          if(image1) this.imagesService.save(new ImageRequest(null, image1, result)).subscribe();
          if(image2) this.imagesService.save(new ImageRequest(null, image2, result)).pipe(delay(200)).subscribe();
          if(image3) this.imagesService.save(new ImageRequest(null, image3, result)).pipe(delay(200)).subscribe();
          if(image4) this.imagesService.save(new ImageRequest(null, image4, result)).pipe(delay(200)).subscribe();
          if(image5) this.imagesService.save(new ImageRequest(null, image5, result)).pipe(delay(200)).subscribe();

          if(result.id) {
            this.productsService.findById(result.id).pipe(delay(1000)).subscribe({
              next: (result: Product) => {

                this.offersService.addNew(new Offer(null, userId, result, true, false)).subscribe({
                  next: (result:Offer) => {

                    for(let a of this.attributes) {
                      let input = this.attributesForm.get(a.name)?.value;                                          
                      
                      if(input && result.product.id) {
                          this.productsService.addValue(new Value(result.product.id, a.id, result.product.category.id, input)).pipe(delay(200)).subscribe();
                      }
                    }

                    this.toast.success("Uspješno ste dodali novu ponudu!");
                    this.router.navigate(['/home']);
                  },
                  error: () => {
                    this.toast.error("Došlo je do greške prilikom čuvanja ponude! Pokušajte ponovo.");
                  }
                });
                
              },
              error: () => {
                this.toast.error("Došlo je do greške prilikom čuvanja proizvoda! Pokušajte ponovo.");
              }
            });

          }
            
        },
        error: () => {
          this.toast.error("Došlo je do greške prilikom čuvanja proizvoda! Pokušajte ponovo.");
        }
      });

    }
  }
}
