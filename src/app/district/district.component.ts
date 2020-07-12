import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';


@Component({
  selector: '[app-district]',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtData
  constructor(private covid : CovidService) { }

  ngOnInit(): void {
    console.log(this.covid.state);
    this.covid.getDataDistrictWise().subscribe(data=>{
      let districtDataArray = [];
      console.log(data);
      this.districtData = data[this.covid.state]["districtData"]
      Object.keys(this.districtData).forEach((key, index) => {
        districtDataArray.push(
          Object.assign({}, { stateName: key }, this.districtData[key])
        );
      });
      console.log("original Data",this.districtData);
      
      this.districtData = districtDataArray
    })
  }

}
