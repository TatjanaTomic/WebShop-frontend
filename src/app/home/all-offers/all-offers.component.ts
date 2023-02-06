import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Offer } from 'src/app/models/Offer';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
  
  public categories: Category[] = [];
  public selectElemenValues: {catTitle: string, catId: number}[] = [];
  public array: Offer[] = [];
  public dataSource: any;  

  public pageSize = 8;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  obs: Observable<any> | undefined;

  public isUserSignedIn: boolean = false;

  public form: FormGroup = new FormGroup({});

  constructor(private offersService: OffersService, private authService: AuthService, private categoriesService: CategoriesService, private formBuilder: FormBuilder, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.isUserSignedIn = this.authService.isSignedIn && this.authService.isActivated;
    this.form = this.formBuilder.group({
      content: [null, Validators.required]
    });
    this.prepareSelectELement();
    this.getArray();
  }

  search() {
    let content = this.form.value.content;

    this.offersService.findByProductName(content).subscribe(
      (response) => {
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<Offer>(response);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  public getArray() {
    this.offersService.findAll().subscribe(
      (response) => {
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<Offer>(response);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  public prepareSelectELement() {
    this.categoriesService.findAll().subscribe((result) => {
      this.categories = result;
      for(var c of result) {
        let catId = c.id;
        let catTitle = this.returnName(c);
        this.selectElemenValues.push({catTitle, catId});
      }
      this.selectElemenValues.sort((a, b) => a.catTitle.localeCompare(b.catTitle));
    });
  }

  public returnName(c: Category): string {
    return this.categoriesService.getCategoryTitle(c);
  }

  public selectCategory(id: number) {
    this.offersService.findByCategoryId(id).subscribe(
      (response) => {
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<Offer>(response);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  public viewDetails(o: Offer) {
    this.offersService.setOffer(o);
    this.router.navigate(['/details']);
  }

}