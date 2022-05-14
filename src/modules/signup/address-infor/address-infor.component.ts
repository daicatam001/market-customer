import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-infor',
  templateUrl: './address-infor.component.html',
  styleUrls: ['./address-infor.component.scss']
})
export class AddressInforComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['signup'])
  }

}
