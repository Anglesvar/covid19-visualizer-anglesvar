import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";
import { Router } from '@angular/router';
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
  activeCases;
  currentStateData;
  constructor(private covid: CovidService, private route: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("user-token")) 
      this.route.navigateByUrl("/login");
    this.data = this.covid.getDataStateWise().subscribe(res=>{
      console.log(res.data.statewise);
      this.stateWise = res.data.statewise;
    });
    this.covid.getTotalCase().subscribe(data=>{
      this.totalCases = data;
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

}
