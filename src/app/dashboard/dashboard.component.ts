import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data;
  stateWise;
  district;
  districtData;
  totalCases;
  activeCases=0;
  confirmedCases=0;
  recoveredCases=0;
  deaths=0;
  currentStateData;
  
  constructor(private covid: CovidService, private route: Router, public toast: ToastService) { }

  ngOnInit(): void {
    // if(!localStorage.getItem("user-token")) 
    //   this.route.navigateByUrl("/login");
    
    this.data = this.covid.getDataStateWise().subscribe(res=>{
      console.log(res.data.statewise);
      this.stateWise = res.data.statewise;
    });
    this.covid.getTotalCase().subscribe(data=>{
      this.totalCases = data;
      this.confirmedCases = data.confirmed.value
      this.recoveredCases = data.recovered.value;
      this.deaths = data.deaths.value
      this.activeCases = (data.confirmed.value - data.deaths.value - data.recovered.value)
    })
  }
  onGetState(state) {
    console.log(state);
      this.covid.getState(state); 
    }

  
    hideData(data) {
      console.log(data);    
      this.currentStateData = data;  
      if(data && data['show'] == true) {
        data['show'] = false;
      } else {
        data['show'] = true;
      }
    }

    logout(){
      localStorage.removeItem("user-token");
      this.toast.show('Logout Successful', {
        classname: 'bg-info text-light',
        delay: 2000,
        autohide: true
      });      this.route.navigateByUrl("/login");
    }

}
