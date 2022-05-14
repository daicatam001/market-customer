import { Component, OnInit } from '@angular/core';
import ResourcesService from 'src/services/resources.service';
import { ResourcesStore } from 'src/stores/resources.store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  constructor(private resourcesStore: ResourcesStore){

  }
  ngOnInit(): void {
    // this.resourcesStore.getResources()
  } 
}

