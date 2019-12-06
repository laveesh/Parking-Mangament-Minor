import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/AccountOwner/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  firstName = '';
  lastName = '';
  emailID = '';
  address = '';
  userName = '';
  password = '';
  userType = '';

  private patrolUserDetails;
  InvalidUser = false;

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.UserService.getAllPatrolUsers().subscribe(res => {
      console.log('return call from db', res);
      this.patrolUserDetails=res;
    });
  }

  addPatrolUser() {
    const patrolUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      emailID: this.emailID,
      password: this.password,
      userName: this.firstName,
      userType: 'Patrol',

    };
    /*Checking if users exists in DB by calling LoginServices*/
    console.log('before service call: ', patrolUser);
    this.UserService.createPatrolUser(patrolUser).subscribe( (data) => {
      /*Receives success message if user exists and with correct credentails*/
      // @ts-ignore
      if (data.message === 'success') {
        console.log(data);
        this.UserService.getAllPatrolUsers().subscribe(res => {
          console.log('return call from db', res);
          this.patrolUserDetails=res;
        });
      } else {
        // @ts-ignore
        console.log(data.message);
        this.InvalidUser = true;
      }
    });

  }
}
