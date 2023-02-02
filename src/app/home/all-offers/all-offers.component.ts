import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

  public users: User[] = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.findAll().subscribe(data => { this.users = data; });
  }
}
