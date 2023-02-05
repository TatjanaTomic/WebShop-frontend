import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/Offer';
import { OffersService } from 'src/app/services/offers-service/offers.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
  
  public array: Offer[] = [];
  public dataSource: any;  

  public pageSize = 8;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  obs: Observable<any> | undefined;

  constructor(private offersService: OffersService, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getArray();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private getArray() {
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

}